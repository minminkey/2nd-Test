export default function Nodes({$app, initialState, onClick, onBackClick}){
    this.state = initialState;

    this.$target = document.createElement('div');
    this.$target.className = "Nodes";
    $app.appendChild(this.$target);

    this.onClick = onClick;
    this.onBackClick = onBackClick;

    this.setState = nextState => {
        this.state = nextState;
        this.render();
    }

    this.render = () => {
        this.$target.innerHTML = '';
        if(!this.state.isRoot){
            const prev = document.createElement('div');
            prev.className = "Node";
            prev.addEventListener('click', onBackClick);
            const prevImg = document.createElement('img');
            prevImg.src = "./assets/prev.png";
            prev.appendChild(prevImg);
            this.$target.appendChild(prev);
        }
        this.state.nodes.forEach(node => {
            const child = document.createElement('div');
            child.className = "Node";
            child.dataset.nodeId = node.id;
            // console.log(node);
            child.addEventListener('click', (e)=>{
                const {nodeId} = e.currentTarget.dataset;
                // console.log(nodeId, node.id);
                if(nodeId === node.id){
                    this.onClick(node);
                }
            });
            const childImg = document.createElement('img');
            childImg.src = node.type === "DIRECTORY" ? "./assets/directory.png" : "./assets/file.png";
            const childName = document.createElement('div');
            childName.innerText = node.name;
            child.appendChild(childImg);
            child.appendChild(childName);
            this.$target.appendChild(child);
        })
    }

    this.render();
}