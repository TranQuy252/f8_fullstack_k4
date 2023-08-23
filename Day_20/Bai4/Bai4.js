var postList = [
    {
        title: 'Post 1 - Lorem ipsum dolor sit.',
        desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima eos voluptatum culpa numquam aut neque a alias impedit saepe fuga illo explicabo nulla incidunt ab nihil vero, vitae doloremque quasi, mollitia, rem deserunt delectus repellendus sed et. Rerum, autem alias!',
        imgURL: 'https://picsum.photos/300/200'
    },
    {
        title: 'Post 2 - Lorem ipsum dolor sit.',
        desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima eos voluptatum culpa numquam aut neque a alias impedit saepe fuga illo explicabo nulla incidunt ab nihil vero, vitae doloremque quasi, mollitia, rem deserunt delectus repellendus sed et. Rerum, autem alias!',
        imgURL: 'https://picsum.photos/300/200'
    },
    {
        title: 'Post 3 - Lorem ipsum dolor sit.',
        desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima eos voluptatum culpa numquam aut neque a alias impedit saepe fuga illo explicabo nulla incidunt ab nihil vero, vitae doloremque quasi, mollitia, rem deserunt delectus repellendus sed et. Rerum, autem alias!',
        imgURL: 'https://picsum.photos/300/200'
    },
]

var html = '';

html = postList.map(post => {
    return `
    <div class="post">
        <div class="post_thumb">
        <img src=${post.imgURL} alt=${post.title}>
        </div>
        <div class="post_info">
        <h2 class="post_title">${post.title}</h2>
        <p class="post_desc">${post.desc}</p>
        </div>
    </div> `
}).join('');

document.getElementById('Bai4').innerHTML = html;

console.log(html);