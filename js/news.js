const loadAllCategories = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await res.json();
    const newsCategory = data.data.news_category;
    displayAllCategory(newsCategory);
}

const displayAllCategory = categories => {
    const categoryContainer = document.getElementById('category-container');
    categories.forEach(category => {
        const li = document.createElement('li');
        li.classList = ` px-3 py-1 rounded-md cursor-pointer`;
        li.setAttribute('onclick', `loadNewsByCategory('${category.category_id}')`);
        li.innerText = `${category.category_name}`;
        categoryContainer.appendChild(li);
    });
}

loadAllCategories();