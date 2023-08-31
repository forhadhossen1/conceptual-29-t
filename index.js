const handleCategory = async () => {
    const response = await fetch(`https://openapi.programming-hero.com/api/news/categories`);
    const data = await response.json();
    const newses = data.data.news_category;
    // console.log(newses);

    const tabContainer = document.getElementById('tab-container');
    newses.slice(0, 3).forEach(category => {
        count = count + 1;
        const div = document.createElement('div');
        div.innerHTML = `
        <a onclick = "handleNews('${category.category_id}')" class="tab">${count} ${category.category_name}</a> 
        `;
        tabContainer.appendChild(div);
    });
};


const handleNews = async (categoryId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`);
    const data = await response.json();
    const allData = data.data;
    // console.log(news);


    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    allData?.forEach((news) => {
        // console.log(news);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card  bg-gray-50 text-black text-neutral-content">
        <div class="card-body  text-center">
          <img
            src="${news?.image_url}"
            alt="heading image">
          <div class="flex justify-between items-center">
            <h2 class="card-title text-left">${news?.title.slice(0, 30)}</h2>
            <button class="btn btn-active btn-secondary rounded-3xl">${news?.rating?.badge}</button>
          </div>
          <p class="text-gray-500 flex justify-start py-5 text-left">${news?.details.slice(0, 70)}</p>

          <div>
            <h5 class = "text-left py-5">Total views: ${news?.total_view ? news.total_view : "No views"}</h5>
          </div>
          <div class="card-actions justify-between">
            <div class="flex justify-between">
              <img
                src="${news?.author?.img}"
                alt="" class="w-16 h-16 rounded-full">
              <div class=" text-left">
                <h3>${news?.author?.name}</h3>
                <p>${news?.author?.published_date}</p>
              </div>
            </div>
            <button onclick="handleModal('${news._id}')" class="btn bg-gray-900 text-white border-none hover:bg-slate-600">Details</button>
          </div>
        </div>
      </div>
        `;

        cardContainer.appendChild(div);

    });

};


const handleModal = async (newsId) => {
    // console.log(newsId);

    const response = await fetch(`https://openapi.programming-hero.com/api/news/${newsId}`);

    const data = await response.json();
    const show = data.data[0];
    console.log(show);

    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = '';
    const div = document.createElement('div');
    div.innerHTML = `
<dialog id="my_modal_1" class="modal">
  <form method="dialog" class="modal-box">
  <img
  src="${show?.image_url}"
  alt="heading image">
    <h3 class="font-bold text-lg py-4">${show?.title}</h3>
    <p class="py-4">${show?.details}</p>
    <div class="modal-action">
      <!-- if there is a button in form, it will close the modal -->
      <button class="btn">Close</button>
    </div>
  </form>
</dialog>

    `;
    modalContainer.appendChild(div);

    const modal = document.getElementById('my_modal_1')
    modal.showModal();
};




handleNews('01');
handleCategory();
let count = 0;