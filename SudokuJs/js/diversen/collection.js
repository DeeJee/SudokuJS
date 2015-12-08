var Collection = function (values) {
    this.count = 0;
    this.collection = [];

    if (values) {
        this.collection = values;
        this.count = values.length;
    }

    this.add = function (item) {
        if (this.collection[this.count] != undefined)
            return undefined;
        this.collection[this.count] = item;
        this.count++;
    }

    this.remove = function (key) {
        var newIndex = 0;
        var newCollection = [];
        for (index = 0; index < this.collection.length; index++) {
            if (this.collection[index] != key) {
                newCollection[newIndex] = this.collection[index];
                newIndex++;
            }
        }
        this.collection = newCollection;
        this.count = this.collection.length;
    }

    this.forEach = function (block) {
        for (key in this.collection) {
            if (this.collection.hasOwnProperty(key)) {
                block(this.collection[key]);
            }
        }
    }

    this.get = function (index) {
        return this.collection[index];
    }

    this.toString = function () {
        var result = '';
        this.collection.forEach(function (value) {
            result += value + ' ';
        });
        return result;
    }  
}