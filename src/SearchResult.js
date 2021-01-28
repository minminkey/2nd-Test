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
  
    render() {

      this.$searchResult.innerText = '';

      if(this.data.length>0){
        this.$searchResult.innerHTML = this.data
          .map(
            cat => `
              <article class="item">
                <img src=${cat.url} alt=${cat.name} />
              </article>
            `
          )
          .join("");
    
        this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
          $item.addEventListener("click", () => {
            console.log(this.data);
            this.onClick(this.data[index]);
          });
        });
      } else {
        const noData = document.createElement('h1');
        noData.className = 'no-data';
        noData.innerText = '검색 결과 없음';
        this.$searchResult.appendChild(noData);
      }
    }
  }
  