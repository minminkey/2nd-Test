export default function Loading({$app, initialState}){
    this.state = initialState;

    this.$target = document.createElement('div');
    this.$target.className = "Modal Loading";
    $app.appendChild(this.$target);

    setState = nextState => {
        this.state = nextState;
        this.render();
    }

    this.render = () => {
        this.$target.innerHTML = '';
        if(this.state){
            const content = document.createElement('div');
            content.className = "content";
            const loadingImg = document.createElement('img');
            loadingImg.src = "./assets/nyan-cat.gif";
            content.appendChild(loadingImg);
            this.$target.appendChild(content);
            this.$target.style.display = 'block';
        }
        else{
            this.$target.style.display = 'none';
        }
    }

    this.render();
}