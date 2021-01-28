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
  
      // this.render();
    }
  
    setState(nextData) {
      this.data = nextData;
      this.render();
    }

    findCatById(id){
      const result = this.data.find(cat => cat.id === id);
      return result;
    }
  
    render() {

      this.$searchResult.innerText = '';

      if(this.data.length>0){
        this.$searchResult.innerHTML = this.data
          .map(
            cat => `
              <article class="item" data-id=${cat.id}>
                <img src=${cat.url} alt=${cat.name} title=${cat.name} />
              </article>
            `
          )
          .join("");
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
      } else {
        const noData = document.createElement('h1');
        noData.className = 'no-data';
        noData.innerText = '검색 결과 없음';
        this.$searchResult.appendChild(noData);
      }
    }
  }
  