import { client } from "./client.js";
import { requestRefresh } from "./token.js";
client.setUrl("https://api-auth-two.vercel.app");

const root = document.querySelector("#root");

const requestRefreshToken = async (tokens) => {
  // const tokens = localStorage.getItem("login_token");
  const { refreshToken } = JSON.parse(tokens);
  const { data, response } = await requestRefresh(refreshToken);
  if (response.ok) {
    localStorage.setItem("login_token", JSON.stringify(data.token));
  }
};
const isLogin = () => {
  //
  const tokens = localStorage.getItem("login_token");
  if (tokens) {
    return true;
  }
  return false;
};
const handleLogout = async () => {
  const tokens = localStorage.getItem("login_token");

  if (tokens) {
    let { accessToken, refreshToken } = JSON.parse(tokens);
    client.setToken(accessToken);

    const { data: response } = await client.post("/auth/logout", {});
    if (+response.status === 401) {
      await requestRefreshToken(tokens);
      localStorage.removeItem("login_token");
      renderLogin();
    } else {
      localStorage.removeItem("login_token");
      renderLogin();
    }
  }
};
const eventLogout = () => {
  const logout = document.querySelector(".profile .btn-logout");
  if (logout) {
    logout.addEventListener("click", (e) => {
      e.preventDefault();
      handleLogout();
    });
  }
};
const renderPostBlog = (content) => {
  const patterns =
    /(((0|\+84)\d{9})|(?:http|https):\/\/([\w\-_]*\.)?([\w\-_]+)\.([a-z]{2,})\/([\w\?]+)?[\w\.\/\?\-_+=#]*)/gi;
  const pattern =
    /^((0|\+84)\d{9})|((?:http|https):\/\/([\w\-_]*\.)?([\w\-_]+)\.([a-z]{2,})(\/?)([\w\?]+(?:=)?)(?:\/)?([\w\.\/\?\-_+=#]*))$/;
  const results = content.match(patterns);
  if (results) {
    let templates = [];
    const newArrUrl = results.map((result) => {
      const url = result.match(pattern);
      templates.push(url[3]);
      if (url[5] === "undefine") {
        return `<a>${url[0]}</a>`;
      }
      if (url[5] === "youtube") {
        return `<iframe width="100%" height="200" src="https://youtube.com/embed/${url[9]}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
      } else {
        return `<a href=${url[0]}>${url[0]}</a>`;
      }
    });
    let oldArrUrl = content.match(patterns);
    for (var i in newArrUrl) {
      content = content.replace(oldArrUrl[i], newArrUrl[i]);
    }
  }
  return content;
};
const handleBlogs = async () => {
  const { data: blogs } = await client.get("/blogs");
  const posts = document.querySelector(".posts");
  posts.innerHTML = `
    <form
        action=""
        class="post-form"
        
      >
        <div class="mb-4">
          <input type="text" class="title" placeholder="Tiêu đề bạn đang nghĩ?" style="border: none; border-radius: 99px; box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px; width: 200px; margin-left: 50px; padding: 10px"/>
        </div>
        <div class="mb-4" style="display: flex">
        <div class="user-image"><i class="fa-solid fa-circle-user"></i></div>
          <input type="text" class="content" placeholder="Bạn đang nghĩ gì ?" style="border: none; border-radius: 99px; box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px; width: 300px; padding: 10px"/>
        </div>
        <input type="date" class="date-input" />
        <button class="btn-post" style="border: 0; width: 100%; height: 40px; border-radius: 99px; background: green; color: #fff;">Đăng bài</button>
      </form>
  `;
  const postEl = blogs.data
    .map((blog) => {
      const today = new Date();
      const timeUp = new Date(blog.timeUp);
      const nowTime = today.getTime();
      const currentTime = timeUp.getTime();
      let diffTime = nowTime - currentTime;
      const dayAgo = Math.floor(diffTime / (24 * 60 * 60 * 1000));
      diffTime -= dayAgo * (24 * 60 * 60 * 60 * 1000);
      const hourAgo = Math.floor(diffTime / (3600 * 1000));
      diffTime -= hourAgo * 8640;
      const minutesAgo = Math.floor(diffTime / (60 * 1000));
      let timer;
      if (dayAgo > 0) {
        timer = `${dayAgo} ngày trước`;
      } else if (hourAgo > 0) {
        timer = `${hourAgo} giờ trước`;
      } else if (minutesAgo > 0) {
        timer = `${minutesAgo} phút trước`;
      } else {
        timer = "Vừa xong";
      }
      const dayUp = timeUp.getDay();
      const dateUp = timeUp.getDate();
      const monthUp = timeUp.getMonth();
      const yearUp = timeUp.getFullYear();
      let textDay;
      switch (dayUp) {
        case 0:
          textDay = "Chủ nhật";
          break;
        case 1:
          textDay = "Thứ hai";
          break;
        case 2:
          textDay = "Thứ ba";
          break;
        case 3:
          textDay = "Thứ tư";
          break;
        case 4:
          textDay = "Thứ năm";
          break;
        case 5:
          textDay = "Thứ sáu";
          break;
        case 6:
          textDay = "Thứ bảy";
          break;
        default:
          break;
      }
      return `
  <div class="post">
  <div class="header">
    <div class="info">
      <div class="avatar"><a href="#">${blog.userId.name
        .slice(0, 1)
        .trim()}</a></div>
      <span class="name" style="font-weight: 600">${blog.userId.name}</span>
      <span class="time" style="font-style: italic">${timer}</span>
    </div>
    
    <hr />
  </div>
  <b class="title">${blog.title}</b>
  <p class="content">${renderPostBlog(blog.content)}</p>
  <hr />
  <span>Ngày đăng: ${textDay}/ ${dateUp}/ ${monthUp}/ ${yearUp}</span>
</div>
  `;
    })
    .join("");
  posts.innerHTML += postEl;
  eventPost();
};

const renderLogin = () => {
  root.innerHTML = `
      <div class="container py-3">
          <div class="row justify-content-center">
            <div class="col-3">
              <h2 class="text-center">Đăng nhập</h2>
              <form action="" class="login">
                <div class="mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    class="form-control email"
                    placeholder="Email..."
                  />
                </div>
                <div class="mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    class="form-control password"
                    placeholder="Password..."
                  />
                </div>
                <div class="d-grid">
                  <button class="btn btn-primary">Đăng nhập</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      `;
};
const renderProfile = async () => {
  const tokens = localStorage.getItem("login_token");
  let nameValue;
  if (tokens) {
    let { accessToken, refreshToken } = JSON.parse(tokens);
    client.setToken(accessToken);

    const { data: profile, response } = await client.get("/users/profile", {});
    if (+response.status === 401) {
      await requestRefreshToken(tokens);
      localStorage.removeItem("login_token");
      renderLogin();
    }
    const name = profile.data.name;
    nameValue = name;
  }
  root.innerHTML = `<div class="main">
      <div class="aside-left profile">
        <div class="user">
          <div class="user-name"><i class="fa-solid fa-circle-user"></i></div>
          <span class="name">${nameValue}</span>
        </div>
        <button class="btn-logout" style="border: 0; width: 100px; height: 40px; margin-top: 10px; border-radius: 99px; background: green; color: #fff">Đăng xuất</button>
      </div>
      <div class="posts"></div>
      <div class="aside-right">
        <div class="header-aside-right">
          <span>Lời mời kết bạn</span>
          <a href="#">Xem tất cả</a>
        </div>
      </div>
    </div>
          `;
  eventLogout();
  handleBlogs();
};
const render = () => {
  if (isLogin()) {
    renderProfile();
  } else {
    renderLogin();
  }
};

const eventLogin = () => {
  const loginForm = document.querySelector(".login");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = e.target.querySelector(".email").value;
      const password = e.target.querySelector(".password").value;
      handleLogin({ email, password });
    });
  }
};
const eventPost = () => {
  const postForm = document.querySelector(".posts .post-form");
  if (postForm) {
    postForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = e.target.querySelector(".title").value;
      const content = e.target.querySelector(".content").value;
      handlePost({
        title: title,
        content: content,
      });
    });
  }
};
render();


const loading = (mode = "add") => {
  const loginForm = document.querySelector(".login");
  if (loginForm) {
    const btn = loginForm.querySelector(".btn");
    if (mode === "add") {
      btn.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Loading`;
      btn.disabled = true;
    } else {
      btn.innerText = "Đăng nhập";
      btn.disabled = false;
    }
  }
};

const handleLogin = async (data) => {
  const msg = document.querySelector(".msg");
  msg.innerText = ``;
  loading();
  const { data: tokens, response } = await client.post("/auth/login", data);

  if (response.ok) {
    const token = {
      accessToken: tokens.data.accessToken,
      refreshToken: tokens.data.refreshToken,
    };
    localStorage.setItem("login_token", JSON.stringify(token));
    render();
  } else {
    msg.innerText = `Thông tin đăng nhập không hợp lệ`;
  }
  loading("remove");
};

const handlePost = async (data) => {
  const { response } = await client.post("/blogs", data);
  const tokens = localStorage.getItem("login_token");
  if (tokens) {
    const { accessToken } = JSON.parse(tokens);
    client.setToken(accessToken);
    if (+response.status === 401) {
      await requestRefreshToken(tokens);
      localStorage.removeItem("login_token");
      renderLogin();
    } else {
      requestRefreshToken(accessToken);
      handleBlogs();
    }
  }
};