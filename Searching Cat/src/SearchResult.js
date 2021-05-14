// import {lazyLoad} from './lazyLoad.js';

class SearchResult {
    $searchResult = null;
    data = null;
    onClick = null;
  
    constructor({ $target, initialData, onClick }) {
      this.$searchResult = document.createElement("section");
      this.$searchResult.className = "SearchResult";
      $target.appendChild(this.$searchResult);
      this.data = initialData;
      this.onClick = onClick;
  
      this.render();
      console.log(this.$searchResult);
      lazyLoad();
    }
  
    setState(nextData) {
      this.data = nextData;
      this.render();
      console.log(this.$searchResult);
      lazyLoad();
    }

    findCatById(id){
      const result = this.data.find(cat => cat.id === id);
      return result;
    }
  
    render() {

      this.$searchResult.innerText = '';
      if(!this.data)  return;
      if(this.data.length>0){
        this.data.map(cat=>{
          const article = document.createElement('article');
          article.className = "item";
          article.dataset.id = cat.id;
          const img = document.createElement('img');
          img.className = "lazy";
          img.dataset.src = cat.url;
          img.alt = cat.name;
          img.title = cat.name;
          article.appendChild(img);
          this.$searchResult.appendChild(article);
        });
        this.$searchResult.addEventListener('click', e=>{
          const path = e.path;
          const card = path.find(comp=>comp.className == 'item');
          console.log(card);
          if(card){
            const id = card.dataset.id;
            const catInfo = this.findCatById(id);
            this.onClick(catInfo);
          }
        });
        // lazyLoad();
      } else {
        const noData = document.createElement('h1');
        noData.className = 'no-data';
        noData.innerText = '검색 결과 없음';
        this.$searchResult.appendChild(noData);
      }
    }
  }
  