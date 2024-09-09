let logic = "or";

const CATEGORIES = [{
    'tag': 'book',
    'desc': 'My opinion about a book. May include spoilers!'
}, {
    'tag': 'leisure',
    'desc': 'Just some fun topics I deal with in my free time :)'
}, {
    'tag': 'fantasy',
    'desc': 'Media set in fantasy worlds.'
}, {
    'tag': 'opinion',
    'desc': 'My personal opinion about stuff.'
}, {
    'tag': 'society',
    'desc': 'A topic concerning the entire society.'
}, {
    'tag': 'project',
    'desc': 'A post about a personal project of mine'
}, {
    'tag': 'IT',
    'desc': 'A post about IT stuff.'
}, {
    'tag': 'hardware',
    'desc': 'A post about hardware stuff.'
}, {
    'tag': 'fun',
    'desc': 'Shits n giggles'
}, {
    'tag': 'physics',
    'desc': 'Beware! This post contains physics talk! Flatearthers keep out.'
}, {
    'tag': 'popscience',
    'desc': 'Scratching the edge of actual science but only so slightly that me and you can understand :)'
// }, {
//     'tag': '',
//     'desc': ''
}];

function renderPosts() {
    let activeFilters = Array.from(document.getElementsByClassName('toggle-on')).map(button => button.innerHTML.substring(1));
    const posts = document.getElementsByClassName('post');
    for (let i = 0; i < posts.length; i++) {
        filterTags = Array.from(posts[i].classList).filter(tag => tag != 'post');
        if (logic == "or") {
            posts[i].style.display = filterTags.some(e => activeFilters.includes(e)) ? "block" : "none";
        } else {
            posts[i].style.display = filterTags.every(e => activeFilters.includes(e)) ? "block" : "none";
        }
    }
}

function renderFilteringButtons() {
    CATEGORIES.forEach((category)=>{
        const btn = document.createElement("button");
        btn.innerHTML = "#" + category['tag'];
        btn.type = "button";
        btn.classList = "tooltip toggle button btn-link is-rounded toggle-on toggle-" + category['tag'];
        btn.title = category["desc"];
        btn.onclick = function() {
            btn.classList.toggle('toggle-on');
            renderPosts();
        }
        ;

        const filteringSpan = document.getElementsByClassName("filtering")[0];
        filteringSpan.appendChild(btn);
    }
    )
}

function toggleAllFilters() {
    // if at least one off -> all on, else all off
    let filters = document.getElementsByClassName("toggle");
    let activeFilters = document.getElementsByClassName("toggle-on");

    if (activeFilters.length == filters.length) {
        for (let filter of filters) {
            filter.classList.remove("toggle-on");
        }
    } else {
        for (let filter of filters) {
            filter.classList.add("toggle-on");
        }
    }

    renderPosts()
}

function toggleTagVisibility() {
    let currState = document.getElementsByClassName("hide-tags")[0].classList.toggle('hidden');
    document.getElementsByClassName("show-tags")[0].classList.toggle('hidden');

    CATEGORIES.forEach((className)=>{
        const elements = document.getElementsByClassName("filtering");

        for (let i = 0; i < elements.length; i++) {
            elements[i].style.display = currState ? "grid" : "none";
        }
    }
    )

}

function toggleLogic() {
    let currState = document.getElementsByClassName("and-logic")[0].classList.toggle('hidden');
    document.getElementsByClassName("or-logic")[0].classList.toggle('hidden');

    if (logic == "or") {
        logic = "and";
    } else {
        logic = "or";
    }

    renderPosts()
}

function addTooltips() {
    let posts = document.getElementsByClassName("post");
    for (let post of posts) {
        filterTags = Array.from(post.classList).filter(tag => tag != 'post');
        var newP = document.createElement('p');
        newP.classList.add('tags');
        for (let filter of filterTags) {
            var newSpan = document.createElement('span');
            newSpan.classList.add('tag');
            newSpan.innerHTML = '#' + filter;
            category = CATEGORIES.find(category => category.tag == filter);
            if (category == undefined) {
                console.log(filter + " not in list!")
            } else {
                newSpan.setAttribute('title', CATEGORIES.find(category => category.tag == filter)['desc']);
            }
            newP.appendChild(newSpan);
        }
        post.appendChild(newP);
    }
}

function init() {
    addTooltips();
    renderFilteringButtons();
}

window.onload = init
