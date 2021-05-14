export default function Breadcrumb({$app, initialState, onClick}){
    this.state = initialState;

    this.$target = document.createElement('nav');
    this.$target.className = "Breadcrumb";
    $app.appendChild(this.$target);

    this.onClick = onClick;

    this.setState = nextState => {
        this.state = nextState;
        this.render();
    }

    this.render = () => {
        this.$target.innerHTML = '';
        const root = document.createElement('div');
        root.dataset.nodeId = "root";
        root.innerText = 'root';
        root.addEventListener('click', (e)=>{
            const {nodeId} = e.currentTarget.dataset;
            if(nodeId === "root"){
                this.onClick("root");
            }
        })
        this.$target.appendChild(root);
        this.state.forEach(node => {
            const child = document.createElement('div');
            child.innerText = node.name;
            child.dataset.nodeId = node.id;
            child.addEventListener('click', (e)=>{
                const {nodeId} = e.currentTarget.dataset;
                if(nodeId === node.id){
                    this.onClick(node.id);
                }
            })
            this.$target.appendChild(child);
        })
    }

    this.render();
}