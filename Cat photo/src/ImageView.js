const IMG_PATH = 'https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public';

export default function ImageView({$app, initialState}){
    this.state = initialState;

    this.$target = document.createElement('div');
    this.$target.className = "Modal ImageViewer";
    $app.appendChild(this.$target);

    this.setState = nextState => {
        this.state = nextState;
        this.render();
    }

    this.render = () => {
        this.$target.innerHTML = '';
        const content = document.createElement('div');
        content.className = "content";
        this.$target.appendChild(content);
        if(this.state){
            const contentImg = document.createElement('img');
            contentImg.src = `${IMG_PATH}${this.state}`;
            content.appendChild(contentImg);
            const clickClose = (e) => {
                if(e.target.className === "Modal ImageViewer"){
                    this.$target.style.display = 'none';
                    this.$target.removeEventListener('click', clickClose);
                }
            }
            const keyClose = (e) => {
                if(e.key==="Escape"){
                    this.$target.style.display = 'none';
                    window.removeEventListener('keydown', keyClose);
                }
            }
            this.$target.addEventListener('click', clickClose);
            window.addEventListener('keydown', keyClose);
            this.$target.style.display = 'block';
        }
        else{
            this.$target.style.display = 'none';
        }
    }

    this.render();

}