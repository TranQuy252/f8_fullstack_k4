F8.component("counter-app", {
  data: () => ({
    count: 0,
    title: "Count",
  }),
  template: `
      <h2>{ title }</h2>
      <h3 >Đã đếm: { count } lần</h3>
      <button v-on:click="count--">-</button>
      <button v-on:click="count++">+</button>
  `,
});
F8.component("header-component", {
  template: `<h1>HEADER</h1>`,
});