function useSorting() {
    function toSort(order, list) {

        /* код сортирует по id. Чтобы создать внешний вид дерева, но без рекурсии, надо сгруппировать,
        и группе добавить динамически отступ в зависимости от уровня
         вопрос - выиграем ли мы по производительности?*/

        // if (order === 'asc') {
        //     return list.sort((a, b) => a['id'] > b['id'] ? 1 : -1)
        // }
        // if (order === 'desc') {
        //     return list.sort((a, b) => a['id'] < b['id'] ? 1 : -1)
        // }
        return list.sort(() => Math.floor(Math.random() - 0.5))
    }

    return { toSort }
}

export default useSorting
