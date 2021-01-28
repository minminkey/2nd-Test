
console.log("app is running!");

class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;

    

    const darkmodeBtn = document.createElement('button');
    darkmodeBtn.className = "darkmodeBtn";
    darkmodeBtn.innerText = "Toogle Theme";
    $target.appendChild(darkmodeBtn);

    this.searchInput = new SearchInput({
      $target,
      onSearch: async keyword => {
        this.loading.toggleLoading();
        const result = document.querySelector('.SearchResult');
        result.innerHTML = '';
        await api.fetchCats(keyword).then(({ data }) => this.setState(data));
        this.loading.toggleLoading();
      },

      onRandom: async () => {
        this.loading.toggleLoading();
        const result = document.querySelector('.SearchResult');
        result.innerHTML = '';
        await api.fetchRandomCats().then(({ data }) => this.setState(data));
        this.loading.toggleLoading();
      }
    });
    
    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: image => {
      console.log(this.data.length);
        this.imageInfo.setState({
          visible: true,
          image
        });
      }
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null
      }
    });
    this.loading = new Loading({
      $target
    });
  }
  

  setState(nextData) {
    console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }

  

}
