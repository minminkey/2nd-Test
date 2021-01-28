const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, onSearch, onRandom}) {
    const $inputContainer = document.createElement("div");
    $inputContainer.className = 'input-container';

    const $randomBtn = document.createElement("button");
    $randomBtn.className = 'random-btn';
    $randomBtn.innerText = 'Random';
    $randomBtn.addEventListener('click', onRandom);
    const $searchInput = document.createElement("input");
    this.$searchInput = $searchInput;

    this.$searchInput.placeholder = "고양이를 검색해보세요.";

    $searchInput.className = "SearchInput";
    $inputContainer.appendChild($searchInput);
    $inputContainer.appendChild($randomBtn);
    $target.appendChild($inputContainer);


    $searchInput.addEventListener("keyup", e => {
      if (e.keyCode === 13) {
        onSearch(e.target.value);
      }
    });

    console.log("SearchInput created.", this);
  }
  render() {}
}
