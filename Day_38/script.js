import { client } from "./client.js";
import { requestRefresh } from "./token.js";
import { getRefreshTokenFromLocalStorage } from "./token.js";
client.setUrl("https://api-auth-two.vercel.app");
let currentPage = 1;
let isFetching = false;
let hasMore = true;
const showLoading = () => {
  document.getElementById("loading").style.display = "block";
};
const hideLoading = () => {
  document.getElementById("loading").style.display = "none";
};
const fetchData = async function () {
  showLoading();
  const list = document.querySelector(".block-list");
  isFetching = true;
  try {
    const { response, data: _data } = await client.get(
      `/blogs?page=${currentPage}`
    );
    const data = _data.data;
    const stripHtml = (html) => {
      return html.replace(/(<([^>]+)>)/gi, "");
    };
    isFetching = false;
    if (data.length === 0) {
      hasMore = false;
      return;
    }
    for (let post of data) {
      const div = document.createElement("div");
      const separate = document.createElement("hr");
      const { createdAt } = post;
      const date = new Date(createdAt);
      const dateString = `${date.getDate()} - ${
        date.getMonth() + 1
      } - ${date.getFullYear()} || ${date.getHours()}:${date.getMinutes()}`;
      div.innerHTML = `
          <h2>${stripHtml(post.userId.name)}</h2>
          <h4>${stripHtml(post.title)}</h4>
          <p>${stripHtml(post.content)}</p>
          <p class="date">${stripHtml(dateString)}</p>
          <p class="relative-time">${getRelativeTime(date)}</p>
          `;
      list.appendChild(separate);
      list.appendChild(div);
    }
    currentPage++;
    hideLoading();
  } catch {
    return;
  }
};

window.addEventListener("scroll", () => {
  if (isFetching || !hasMore) {
    return;
  }
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    fetchData();
  }
});

const renderDefault = () => {
  root.innerHTML = `<h1>Blogger</h1><button type="submit" class="btn btn-primary">Đăng nhập</button>
      <div class="block-list"></div>`;
  currentPage = 1;
  fetchData();
};
const renderRegister = () => {
  root.innerHTML = `<div class="container py-3">
  <div class="row justify-content-center">
    <div class="col-7">
      <form class="register">
      <div class="mb-3">
      <label for="">Tên</label>
      <input
        type="text"
        class="form-control name"
        placeholder="Name..."
      />
    </div>
      <div class="mb-3">
        <label for="">Email</label>
        <input
          type="email"
          class="form-control email"
          placeholder="Email..."
        />
      </div>
      <div class="mb-3">
        <label for="">Mật khẩu</label>
        <input
          type="password"
          class="form-control password"
          placeholder="Mật khẩu..."
        />
      </div>
      <div class="d-grid">
        <button type="submit" class="btn btn-primary">Đăng kí</button>
      </div>
      </form>
      <div class ="msg text-danger"></div>
      <div>
      <span>Bạn đã có tài khoản?</span> <a class="login-button" href="#!">Đăng nhập</a>
      </div>
      <a class="default" href="#!">Quay lại trang chủ</a>
    </div>
  </div>
</div>`;
  const login = document.querySelector(".login-button");
  login.addEventListener("click", function (e) {
    e.preventDefault();
    renderLogin();
    app.eventLogin();
  });
  const defaultButton = document.querySelector(".default");
  defaultButton.addEventListener("click", function (e) {
    e.preventDefault();
    app.render();
  });
};
const renderLogin = () => {
  root.innerHTML = `<div class="container py-3">
  <div class="row justify-content-center">
    <div class="col-7">
      <form class="login">
      <div class="mb-3">
        <label for="">Email</label>
        <input
          type="email"
          class="form-control email"
          placeholder="Email..."
          value="vanducnguyen2108@gmail.com"
        />
      </div>
      <div class="mb-3">
        <label for="">Mật khẩu</label>
        <input
          type="password"
          class="form-control password"
          placeholder="Mật khẩu..."
          value="Nguyenduc123"
        />
      </div>
      <div class="d-grid">
        <button type="submit" class="btn btn-primary">Đăng nhập</button>
      </div>
      </form>
      <div class ="msg text-danger"></div>
      <div>
      <span>Tạo tài khoản?</span> <a class="register-button" href="#!">Đăng Ký</a>
      </div>
      <a class="default" href="#!">Quay lại trang chủ</a>
    </div>
  </div>
</div>`;
  const register = document.querySelector(".register-button");
  register.addEventListener("click", function (e) {
    e.preventDefault();
    renderRegister();
    app.eventRegister();
  });
  const defaultButton = document.querySelector(".default");
  defaultButton.addEventListener("click", function (e) {
    e.preventDefault();
    app.render();
  });
};
const app = {
  render: function () {
    const root = document.querySelector("#root");
    if (this.isLogin()) {
      root.innerHTML = `<div class="container py-3">
        <h2 class="text-center">Chào mừng bạn đã quay trở lại</h2>
        <hr/>
        <ul class="list-unstyled d-flex gap-3 profile">
          <li>Chào bạn: <b class="name">Loading...</b></li>
          <li><a href="#"class="logout">Đăng xuất</a></li>
        </ul>
        <form class="post container w-90">
      <div class="form-group text-left">
          <label class="w-100" for="title" class="label-form">Tiêu đề bài viết</label>
          <input class="w-100" id="title" placeholder="Nhập tiêu đề bài viết"/>
      </div>
      <div class "form-group text-left">
          <label class="w-100" for="content" class="label-form">Nhập nội dung bài viết</label>
          <textarea class="w-100" name="" id="content" cols="30" rows="10"></textarea>
      </div>
      <div class "form-group text-left" >
          <label class="w-100" for="content" class="label-form">Chọn thời gian đăng bài</label>
          <input class="w-100" id="date" type="datetime-local">
      </div>
      <button class="btn btn-warning text-left w-100 my-3">Đăng bài</button>
  </form>
  <div class ="msgTwo text-danger"></div>
      </div>
      <div class="block-list"></div>`;
      currentPage = 1;
      fetchData();
      const profileName = document.querySelector(".profile .name");
      this.getProfile(profileName);
      this.eventLogout();
      this.eventPost();
    } else {
      renderDefault();
      const btn = root.querySelector("button");
      btn.addEventListener("click", function () {
        renderLogin();
        app.eventLogin();
      });
    }
  },
  isLogin: function () {
    if (localStorage.getItem("login_tokens")) {
      return true;
    }
    return false;
  },
  handleLogin: async function (data, msg) {
    msg.innerText = "";
    this.addLoading();
    const { data: tokens, response } = await client.post("/auth/login", data);
    this.removeLoading();
    if (!response.ok) {
      msg.innerText = `${tokens.message}`;
    } else {
      localStorage.setItem(`login_tokens`, JSON.stringify(tokens));
      this.render();
    }
  },
  handleRegister: async function (data, msg) {
    msg.innerText = "";
    this.addLoadingRegister();
    const { data: tokens, response } = await client.post(
      "/auth/register",
      data
    );
    this.removeLoadingRegister();
    if (!response.ok) {
      msg.innerText = `${tokens.message}`;
    } else {
      this.render();
    }
  },
  getProfile: async function (el) {
    let loginTokens = localStorage.getItem(`login_tokens`);
    loginTokens = JSON.parse(loginTokens);
    const { data: _data } = loginTokens;
    const { accessToken, refreshToken } = _data;
    client.setToken(accessToken);
    const { response, data } = await client.get("/users/profile");

    if (response.ok) {
      el.innerText = data.data.name;
    } else {
      const newToken = await requestRefresh(refreshToken);
      if (!newToken) {
        this.handleLogout();
      } else {
        localStorage.setItem(`login_tokens`, JSON.stringify(newToken));
        render;
        this.render();
      }
      this.handleLogout();
    }
  },
  handleLogout: function () {
    localStorage.removeItem("login_tokens");
    this.render();
  },
  addLoading: function (a) {
    const form = document.querySelector(".login");
    const btn = form.querySelector(".btn");
    btn.innerHTML = `<span class="spinner-border spinner-border-sm"></span>Loading`;
    btn.disabled = true;
  },
  removeLoading: function () {
    const form = document.querySelector(".login");
    const btn = form.querySelector(".btn");
    btn.innerHTML = `Đăng nhập`;
    btn.disabled = false;
  },
  addLoadingRegister: function () {
    const form = document.querySelector(".register");
    const btn = form.querySelector(".btn");
    btn.innerHTML = `<span class="spinner-border spinner-border-sm"></span>Loading`;
    btn.disabled = true;
  },
  removeLoadingRegister: function () {
    const form = document.querySelector(".register");
    const btn = form.querySelector(".btn");
    btn.innerHTML = `Đăng kí`;
    btn.disabled = false;
  },
  addLoadingPost: function () {
    const form = document.querySelector(".post");
    const btn = form.querySelector(".btn");
    btn.innerHTML = `<span class="spinner-border spinner-border-sm"></span>Loading`;
    btn.disabled = true;
  },
  removeLoadingPost: function () {
    const form = document.querySelector(".post");
    const btn = form.querySelector(".btn");
    btn.innerHTML = `Đăng bài`;
    btn.disabled = false;
  },
  eventLogin: function () {
    const form = document.querySelector(".login");
    const msg = document.querySelector(".msg");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailEl = e.target.querySelector(".email");
      const passwordEl = e.target.querySelector(".password");
      const email = emailEl.value;
      const password = passwordEl.value;
      this.handleLogin({ email, password }, msg);
    });
  },
  eventRegister: function () {
    const form = document.querySelector(".register");
    const msg = document.querySelector(".msg");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nameEl = e.target.querySelector(".name");
      const emailEl = e.target.querySelector(".email");
      const passwordEl = e.target.querySelector(".password");
      const name = nameEl.value;
      const email = emailEl.value;
      const password = passwordEl.value;
      console.log({ name, email, password });
      this.handleRegister({ name, email, password }, msg);
    });
  },

  eventLogout: function () {
    const logout = document.querySelector(".profile .logout");
    logout.addEventListener("click", (e) => {
      e.preventDefault();
      this.handleLogout();
    });
  },
  handlePost: async function (data, msg) {
    msg.innerText = "";
    app.addLoadingPost();
    try {
      if (data.date) {
        const inputDate = new Date(data.date);
        const now = new Date();

        if (inputDate < now) {
          msg.innerText =
            "Ngày đã qua. Vui lòng chọn một ngày trong tương lai.";
          app.removeLoadingPost();
          return;
        } else if (inputDate.getTime() === now.getTime()) {
          this.handlePost(data, msg);
        } else {
          const timeDifference = inputDate - now;
          const hoursDifference = Math.ceil(timeDifference / (1000 * 60 * 60));

          const scheduleMessage = `Bài viết sẽ được đăng sau ${hoursDifference} giờ.`;
          const confirm = window.confirm(scheduleMessage);
        }
      }

      const { data: tokens, response } = await client.post("/blogs", data);
      app.removeLoadingPost();
      if (!response.ok) {
        if (response.status === 401) {
          const refreshToken = getRefreshTokenFromLocalStorage();
          const newTokens = await requestRefresh(refreshToken);
          if (newTokens) {
            localStorage.setItem("login_tokens", JSON.stringify(newTokens));
            this.handlePost(data, msg);
          } else {
            this.handleLogout();
          }
        } else {
          msg.innerText = `${tokens.message}`;
        }
      }
    } catch (error) {
      console.error(error);
    }
  },
  eventPost: function () {
    const post = document.querySelector(".post");
    const titleEl = post.querySelector("#title");
    const contentEl = post.querySelector("#content");
    const msg = document.querySelector(".msgTwo");
    post.addEventListener("submit", function (e) {
      e.preventDefault();
      const title = titleEl.value;
      const content = contentEl.value;
      const dateEl = post.querySelector("#date");
      const date = dateEl.value;
      if (date) {
        app.handlePost({ title, content, date }, msg);
      } else {
        app.handlePost({ title, content }, msg);
      }
    });
  },
};

const getRelativeTime = (date) => {
  const now = new Date();
  const secondsAgo = Math.floor((now - date) / 1000);

  if (secondsAgo < 60) {
    return "Một phút trước";
  } else if (secondsAgo < 3600) {
    const minutesAgo = Math.floor(secondsAgo / 60);
    return `${minutesAgo} phút trước`;
  } else if (secondsAgo < 86400) {
    const hoursAgo = Math.floor(secondsAgo / 3600);
    return `${hoursAgo} giờ trước`;
  } else {
    const daysAgo = Math.floor(secondsAgo / 86400);
    return `${daysAgo} ngày trước`;
  }
};

app.render();