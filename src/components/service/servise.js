class LocalStoreService {
    myStorage = window.localStorage;

    setInfo = (arr) => {

        arr.sort((elem1, elem2) => {
            if (+elem1.id < +elem2.id) {
                return -1;
            }
            if (+elem1.id > +elem2.id) {
                return 1;
            }
            return 0;
        })

        arr.forEach((oneArr) => {
            this.myStorage.setItem(oneArr.id, JSON.stringify({...oneArr}))
            console.log(this.myStorage)
        })
    }

    // getInfoFromStorage = () => {
    //     const parsedArr = [];
    //     for (let i = 1; i <= this.myStorage.length; i++) {
    //         parsedArr.push(JSON.parse(this.myStorage.getItem(i)))
    //     }
    //     return parsedArr;
    // }

    getInfoFromStorage = () => {
        return Object.values(this.myStorage).map((value) => JSON.parse(value))
    }
}

export default LocalStoreService;