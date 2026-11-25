document.addEventListener('DOMContentLoaded', async () => {
    // Получаем параметр mode из URL (?mode=tags или ?mode=plain)
    const params = new URLSearchParams(window.location.search);
    const mode = params.get('mode') || 'plain';

    // Определяем, какой JSON грузить
    const jsonPath = mode === 'tags' 
        ? 'data/reviews_tags.json' 
        : 'data/reviews_plain.json';

    // Скрываем или показываем панель тегов в интерфейсе
    const tagsSidebar = document.getElementById('tags-navigation');
    if (tagsSidebar) {
        tagsSidebar.style.display = mode === 'tags' ? 'block' : 'none';
    }

    try {
        const response = await fetch(jsonPath);
        const reviewsData = await response.json();
        renderReview(reviewsData[0], mode); // Рендерим первый отзыв
    } catch (error) {
        console.error('Ошибка загрузки JSON:', error);
    }
});