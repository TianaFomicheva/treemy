<template>
    <button @click="create">Добавить элемент</button>
    <button @click="sort('asc')">ASC</button>
    <button @click="sort('desc')">DESC</button>
    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr">
        <ul>
            <li v-for="item in sortedList" :key="item.id">{{ item.pid }}-{{ item.id }}</li>
        </ul>
        <pre> {{ sortedList }} </pre>
        <pre>{{ tree }}</pre>
    </div>

    <!--оставляем список как одноуровневый, но с визуальной имитацией древовидности (чтобы без рекурсии)-->
</template>

<script>
import { reactive, ref, computed } from 'vue'
import useSorting from './composition/useSorting'

export default {
    name: 'treeRoot',

    setup() {
        const params = reactive({
            count: 0,
            sortDirection: 'asc'
        })
        const list = ref([])
        const sorting = useSorting()
        const sortedList = computed(() => {
            const sorted = sorting.toSort(params.sortDirection, list.value)
            return sorted || []
        })

        function create() {
            // push имеет сложность O(1)
            params.count++;
            list.value.push({ id: params.count, pid: Math.floor((Math.random() * list.value.length)) })
        }

        function sort(order) {
            params.sortDirection = Math.random()
        }

        const tree = computed(() => {
            const map = new Map;

            list.value.forEach(el => {
                const item = Object.assign({ children: [] }, el)
                const { id, pid } = item

                if (map.has(id)) {
                    item.children = map.get(id).children
                }
                map.set(id, item)

                if (!map.has(pid)) {
                    map.set(pid, { children: [item]})
                } else {
                    map.get(pid).children.push(item)
                }
            })
            const finalTree = Array.from(map.values())
                .filter(item => !map.has(item.pid))
                .reduce((acc, item) => (acc.concat(item.children)), [])
            console.log(finalTree)

            for (let branch in finalTree) {
                // let tree = new Tree(branch)
                console.log(branch)

                // tree.contains(function(node){
                //     if (node.data === branch.id) {
                //         console.log(node);
                //     }
                // }, tree.traverseBF);


                // tree.traverseBF(function(node) {
                //     console.log(node.data)
                // });

            }

            function Node(data) {
                this.data = data;
                this.parent = null;
                this.children = [];
            }

            function Tree(data) {
                var node = new Node(data);
                this._root = node;
            }

            Tree.prototype.traverseDF = function(callback) {

                // это рекурсивная и мгновенно вызываемая функция
                (function recurse(currentNode) {
                    // шаг 2
                    for (var i = 0, length = currentNode.children.length; i < length; i++) {
                        // шаг 3
                        recurse(currentNode.children[i]);
                    }

                    // шаг 4
                    callback(currentNode);

                    // шаг 1
                })(this._root);

            };

            Tree.prototype.traverseBF = function(callback) {
                var queue = new Queue();

                queue.enqueue(this._root);

                currentTree = queue.dequeue();

                while(currentTree){
                    for (var i = 0, length = currentTree.children.length; i < length; i++) {
                        queue.enqueue(currentTree.children[i]);
                    }

                    callback(currentTree);
                    currentTree = queue.dequeue();
                }
            };

            Tree.prototype.contains = function(callback, traversal) {
                traversal.call(this, callback);
            };

            Tree.prototype.add = function(data, toData, traversal) {
                var child = new Node(data),
                    parent = null,
                    callback = function(node) {
                        if (node.data === toData) {
                            parent = node;
                        }
                    };

                this.contains(callback, traversal);

                if (parent) {
                    parent.children.push(child);
                    child.parent = parent;
                } else {
                    throw new Error('Cannot add node to a non-existent parent.');
                }
            };

            Tree.prototype.remove = function(data, fromData, traversal) {
                var tree = this,
                    parent = null,
                    childToRemove = null,
                    index;

                var callback = function(node) {
                    if (node.data === fromData) {
                        parent = node;
                    }
                };

                this.contains(callback, traversal);

                if (parent) {
                    index = findIndex(parent.children, data);

                    if (index === undefined) {
                        throw new Error('Node to remove does not exist.');
                    } else {
                        childToRemove = parent.children.splice(index, 1);
                    }
                } else {
                    throw new Error('Parent does not exist.');
                }

                return childToRemove;
            };

            function findIndex(arr, data) {
                var index;

                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].data === data) {
                        index = i;
                    }
                }

                return index;
            }
            // for (let branch in finalTree) {
            //     let tree = new Tree(branch)
            //     tree._root;


            // }

          
            
            return finalTree
        })

        return { toSort: sorting.toSort, sortedList, create, sort, tree }
    }
}
</script>
