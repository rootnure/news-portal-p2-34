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
      li.classList = `px-2 py-1 rounded-md cursor-pointer`;
      li.setAttribute('onclick', `loadNewsByCategory(this, '${category.category_id}')`);
      li.innerText = `${category.category_name}`;
      categoryContainer.appendChild(li);
   });
}

const loadNewsByCategory = async (target, categoryId = '08') => {
   const activeTab = document.querySelector('.active-tab');
   console.log(activeTab);
   console.log(target);
   target ? activeTab.classList.remove("active-tab") : "";
   target ? target.classList.add('active-tab') : "";

   const apiUrl = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
   const res = await fetch(apiUrl);
   const data = await res.json();
   const allNews = data.data;
   const category = target?.innerText ? target.innerText : 'Default';
   displayCategoryNews(allNews, category);
}

const displayCategoryNews = (allNews, category) => {
   const resultCount = document.getElementById('result-count');
   const resultCountFor = document.getElementById('result-count-for');
   const newsContainer = document.getElementById('news-container');
   newsContainer.textContent = '';

   resultCount.innerText = allNews.length ? allNews.length : "No";
   resultCountFor.innerText = category;
   
   if(allNews.length === 0) {
      newsContainer.innerHTML = `
         <div class="h-96 w-full flex justify-center items-center md:col-span-2 lg:col-span-3">
            <h2 class="text-4xl font-bold"><span class="text-red-500">Oops!!!</span> No news found for "<span class="italic">${category}</span>" category...</h2>
         </div>
      `;
      return;
   }

   allNews.forEach(news => {
      const { image_url, title, details, author, rating, total_view } = news;
      const {img, name, published_date} = author;
      const newsDiv = document.createElement('div');
      newsDiv.setAttribute('title', 'Click to view details');
      newsDiv.classList = `card bg-white cursor-pointer group`;
      newsDiv.innerHTML = `
         <figure>
            <img src="${image_url}" alt="${title}" class="group-hover:scale-105 duration-75" />
         </figure>
         <div class="card-body">
            <h2 class="card-title">${title}</h2>
            <p class="text-justify">${details.length > 550 ? details.slice(0, 500) + '...see more' : details}</p>
            <div class="flex justify-between items-center">
               <div id="author-info" class="flex items-center gap-x-2">
                  <img class="rounded-full w-8 h-8" src="${img}" alt="${`Profile Image of ${name}`}">
                  <div>
                     <h4 class="text-lg">${name}</h4>
                     <date class="text-sm text-gray-400" date="${published_date}">${published_date}</date>
                  </div>
               </div>
               <div id="views" class="font-bold text-center">
                  <i class="fa-regular fa-eye"></i> ${total_view}M
               </div>
               <div id="rating" class="text-sm">
                  <i class="fa-solid fa-star"></i> ${rating.number}
               </div>
            </div>
         </div>
      `;
      newsContainer.appendChild(newsDiv);
   });
}

loadNewsByCategory(null, '08'); // load all news by default using all news category id which is "08"

loadAllCategories();