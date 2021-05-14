const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, keywords, onSearch, onRandom}) {
    this.recent = keywords;
    this.onSearch = onSearch;
    this.onRandom = onRandom;
    
    this.$inputContainer = document.createElement("section");
    this.$inputContainer.className = 'input-container';
    $target.appendChild(this.$inputContainer);

    this.render();
    this.focusOnInput();
  }

  deleteSearchInput(){
    const searchInput = document.querySelector('.SearchInput');
    searchInput.value = '';
  }

  focusOnInput(){
    const Input = document.querySelector('.SearchInput');
    Input.focus();
  }

  addRecentKeyword(keyword){
    if(this.recent.includes(keyword)) return;
    if(this.recent.length === 5)  this.recent.shift();
    this.recent.push(keyword);
    setItem('keywords', this.recent);
    this.render();
  }

  render(){
    this.$inputContainer.innerHTML = '';

    const $randomBtn = document.createElement("button");
    $randomBtn.className = 'random-btn';
    $randomBtn.innerText = 'Random';
    $randomBtn.addEventListener('click', this.onRandom);

    const $searchInput = document.createElement("input");
    $searchInput.placeholder = "고양이를 검색해보세요.";
    $searchInput.className = "SearchInput";
    $searchInput.addEventListener('click', this.deleteSearchInput);

    const recentKeywords = document.createElement('div');
    recentKeywords.className = 'recent-keywords';

    this.recent.map(keyword=>{
      const link = document.createElement('span');
      link.className = 'keyword';
      link.innerText = keyword;
      link.addEventListener('click', ()=>{
        this.addRecentKeyword(keyword);
        this.onSearch(keyword);
      });
      recentKeywords.appendChild(link);
    });

    this.$inputContainer.appendChild($searchInput);
    this.$inputContainer.appendChild($randomBtn);
    this.$inputContainer.appendChild(recentKeywords);


    $searchInput.addEventListener("keyup", e => {
      if (e.keyCode === 13) {
        this.addRecentKeyword(e.target.value);
        this.onSearch(e.target.value);
      }
    });
  }
}
