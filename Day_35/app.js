import { client } from "./clients.js";

window.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".loader").style.display = "block";
})

window.onload = () => {
  document.querySelector(".loader").style.display = "block";
  
    const viewportHeight = document.documentElement.clientHeight;
    window.addEventListener("scroll", (e) => {
      const scrolledY = window.scrollY;
      const pageHeight = document.documentElement.scrollHeight;
      if (scrolledY + viewportHeight >= pageHeight - 100) {
        getPosts();
      }
     
    });

    const getPosts = async () => {
      const { data: posts } = await client.get(`/posts`);
      posts.forEach((post, i) => {
        render(
          posts[i].imgSrc,
          posts[i].avatarSrc,
          posts[i].title,
          posts[i].author
        );
      });
    };

    getPosts();
    const wrapper = document.querySelector(".wrapper");
    function render(imgSrc, avatarSrc, title, author) {
      const html = `
        <div class="item">
                    <div class="header">
                        <img src="${avatarSrc}"
                            alt="" class="avatar">
                        <p class="name">${author}</p>
                    </div>
                    <div class="wrapper__content">
                        <p class="wrapper__content__title">${title}</p>
                        <img src="${imgSrc}"
                            alt="" class="wrapper__content__img">
                    </div>
                    
                </div>
    `;
      wrapper.innerHTML += html;
    }
}