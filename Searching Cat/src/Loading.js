class Loading {
    constructor({$target}) {
        this.loadingWrapper = document.createElement('div');
        this.loadingWrapper.className = 'loading-wrapper';
        this.loadingWrapper.classList.add('hidden');

        $target.appendChild(this.loadingWrapper);
        this.render();
    }

    toggleLoading(){
        const loader = document.querySelector('.loading-wrapper');
        loader.classList.toggle('hidden');
    }

    render(){
        const loadingText = document.createElement('h1');
        loadingText.className = 'loading-text';
        loadingText.innerText = "Loading...";

        this.loadingWrapper.appendChild(loadingText);
    }
}