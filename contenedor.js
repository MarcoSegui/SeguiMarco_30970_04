const fs = require("fs")

class Contenedor {
    constructor(fileName) {
        this.fileName = fileName
    }

    async save(obj) {
        let arrLast = {}
        try {
            const dataGetAll = await this.getAll();
            if (!dataGetAll) {
                obj.id = 1;                
                arrLast = obj;   
                await fs.promises.writeFile(`${this.fileName}`, JSON.stringify([obj]));
                console.log("Creating file...");

            } else {
                obj.id = (dataGetAll.length)+1;
                dataGetAll.push(obj);
                arrLast = dataGetAll[dataGetAll.length-1];
                await fs.promises.writeFile(`${this.fileName}`, JSON.stringify(dataGetAll));
                // return obj.id
            }
            return JSON.stringify(arrLast);
        } catch {
            console.log("Error in function save")
        }
    }

    async getById(id) {
        try {
            const dataGetAll = await this.getAll()
            .then(resp => resp.find(a => id == a.id ))
            return dataGetAll || null
        } catch {
            console.log("Error in function getById")
        }
    }

    async putById(id, param1, param2, param3) {
        try {
            const dataGetAll = await this.getAll();
            const dataGetId = dataGetAll.find(a => id == a.id )
            const arrIndex = dataGetAll.indexOf(dataGetId)
            //console.log(arrIndex)

            if (!param1) { console.log("Title undefined")} else { dataGetAll[arrIndex].title = param1;}
            if (!param2) { console.log("Price undefined")} else { dataGetAll[arrIndex].price = param2;}
            if (!param3) { console.log("Thumbnail undefined")} else { dataGetAll[arrIndex].thumbnail = param3;} 
            
            if ((!param1) && (!param2) && (!param3)) {
                console.log("Loading file...")
            } else {
                await fs.promises.writeFile(`${this.fileName}`, JSON.stringify(dataGetAll));
                console.log("Updating file...");
                }
     
            console.log(dataGetAll)

            return dataGetId || null
        } catch {
            console.log("Error in function putById")
        }
    }

    async getAll() {
        try {
            const readFs = await fs.promises.readFile(`${this.fileName}`, "utf-8");
            const arr = await JSON.parse(readFs);
            return arr
            } catch {
                console.log("Error in function getAll")
        }
    }

    async deleteById(id) {
        try {
            const dataGetAll = await this.getAll()
            .then(resp => resp.filter(a => id != a.id ));
            await fs.promises.writeFile(`${this.fileName}`, JSON.stringify(dataGetAll));
        } catch {
            console.log("Error in function deleteById")
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(`${this.fileName}`,"");
            console.log("Deleting file data...");
        } catch {
            console.log("Error in function deleteAll")
        }
    }

}

module.exports = Contenedor