import Breadcrumb from "./Breadcrumb.js";
import Nodes from "./Nodes.js";
import {request} from "./api.js";
import ImageView from "./ImageView.js";
import Loading from "./Loading.js";

let cache = {};


export default function App($app){
    this.state = {
        isRoot: true,
        depth: [],
        nodes: [],
        selectedFilePath: null,
        isLoading: true,
    };

    const breadcrumb = new Breadcrumb({
        $app,
        initialState: this.state.depth,
        onClick: async (node) => {
            this.setState({
                ...this.state,
                isLoading: true,
                selectedFilePath: null,
            });
            const nextState = {...this.state};
            // console.log(nextState.depth[nextState.depth.length-1].id, node);
            if(node === "root"){
                nextState.depth = [];
            }
            else{
                while(nextState.depth[nextState.depth.length-1].id!==node){
                    nextState.depth.pop();
                }
            }
            const prevNodeId = nextState.depth.length === 0 ? null : 
                nextState.depth[nextState.depth.length-1].id;
            if(prevNodeId === null){
                // const res = await request();
                this.setState({
                    ...nextState,
                    isRoot: true,
                    selectedFilePath: false,
                    nodes: cache["root"],
                    isLoading: false
                });
            } else {
                // const prevNodes = await request(prevNodeId);
                this.setState({
                    ...nextState,
                    isRoot: false,
                    selectedFilePath: false,
                    nodes: cache[prevNodeId],
                    isLoading: false
                });
            }
        }
    });

    const nodes = new Nodes({
        $app,
        initialState: {
            nodes: this.state.nodes,
            isRoot: this.state.isRoot,
        },
        onClick: async (node) => {
            try{
                this.setState({
                    ...this.state,
                    isLoading: true,
                    selectedFilePath: null,
                });
                // console.log(cache);
                if(node.type === 'DIRECTORY'){
                    if(cache[node.id]){
                        this.setState({
                            ...this.state,
                            nodes: cache[node.id],
                            depth: [...this.state.depth, node],
                            isRoot: false,
                        });
                    }
                    else{
                        const nextNode = await request(node.id);
                        this.setState({
                            ...this.state,
                            nodes: nextNode,
                            depth: [...this.state.depth, node],
                            isRoot: false,
                        });
                        cache[node.id] = nextNode;
                    }
                } else if(node.type === 'FILE'){
                    this.setState({
                        ...this.state,
                        selectedFilePath: node.filePath
                    });
                }
            } catch(e) {
                console.log(e.message);
            } finally {
                this.setState({
                    ...this.state,
                    isLoading: false
                });
            }
        },
        onBackClick: async () => {
            try{
                this.setState({
                    ...this.state,
                    isLoading: true,
                    selectedFilePath: null,
                });
                const nextState = {...this.state};
                nextState.depth.pop();

                const prevNodeId = nextState.depth.length === 0 ? null : 
                nextState.depth[nextState.depth.length-1].id;

                if(prevNodeId === null){
                    // const res = await request();
                    this.setState({
                        ...nextState,
                        isRoot: true,
                        selectedFilePath: false,
                        nodes: cache["root"]
                    });
                } else {
                    // const prevNodes = await request(prevNodeId);
                    this.setState({
                        ...nextState,
                        isRoot: false,
                        selectedFilePath: false,
                        nodes: cache[prevNodeId]
                    });
                }
            } catch(e) {
                console.log(e.message);
            } finally {
                this.setState({
                    ...this.state,
                    isLoading: false
                });
            }
        }
    });

    const imageView = new ImageView({
        $app,
        initialState: this.state.selectedFilePath
    })

    const loading = new Loading({
        $app,
        initialState: this.state.isLoading
    });
    
    this.setState = nextState => {
        this.state = nextState;
        breadcrumb.setState(this.state.depth);
        nodes.setState({
            nodes: this.state.nodes,
            isRoot: this.state.isRoot,
        });
        imageView.setState(this.state.selectedFilePath);
        loading.setState(this.state.isLoading);
    }

    const init = async () => {
        this.setState({
            ...this.state,
            selectedFilePath: null,
            isLoading: true
        });
        try{
            const res = await request();
            this.setState({
                ...this.state,
                nodes: res,
                isRoot: true,
                selectedFilePath: null,
            });
            cache["root"] = res;
        } catch(e) {
            throw new Error(`init 실패 : ${e.message}`);
        } finally {
            this.setState({
                ...this.state,
                isLoading: false
            });
        }
    }

    init();
}