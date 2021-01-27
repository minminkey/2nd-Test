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
    }
  
    setState(nextData) {
      this.data = nextData;
      this.render();
    }
  
    render() {
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
    }
  }
  