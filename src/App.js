
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
        await api.fetchCats(keyword).then(({ data }) => this.setState(data));
        this.loading.toggleLoading();
      }
    });
    
    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: image => {
        console.log(this.data);
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
    console.log("Start");
    this.loading = new Loading({
      $target
    });
    console.log(this.loading);
  }
  

  setState(nextData) {
    console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }

  

}
