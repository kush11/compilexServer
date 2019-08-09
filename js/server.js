const express = require('express');
const bodyParser = require("body-parser");
const compiler = require('compilex');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var options = { stats: true }; //prints stats on console 
compiler.init(options);



app.get('/', (req, res) => {
    console.log('ayaa gaya');
    return res.send("Test Data is fetched ")
});

app.get('/ccompiler', async (req, res) => {
    var envData = { OS: "linux", cmd: "g++" };
    code = `#include <stdio.h> 
  
    void swap(int *xp, int *yp) 
    { 
        int temp = *xp; 
        *xp = *yp; 
        *yp = temp; 
    } 
      
    // A function to implement bubble sort 
    void bubbleSort(int arr[], int n) 
    { 
       int i, j; 
       for (i = 0; i < n-1; i++)       
      
           // Last i elements are already in place    
           for (j = 0; j < n-i-1; j++)  
               if (arr[j] > arr[j+1]) 
                  swap(&arr[j], &arr[j+1]); 
    } 
      
    /* Function to print an array */
    void printArray(int arr[], int size) 
    { 
        int i; 
        for (i=0; i < size; i++) 
            printf("%d ", arr[i]); 
        printf("n"); 
    } 
      
    // Driver program to test above functions 
    int main() 
    { 
        int arr[] = {64, 34, 25, 12, 22, 11, 90}; 
        int n = sizeof(arr)/sizeof(arr[0]); 
        bubbleSort(arr, n); 
        printf("Sorted array"); 
        printArray(arr, n); 
        return 0; 
    } `
    var result = '';
    await compiler.compileCPP(envData, code, function (data) {
        // res.send(data);
        if (data.error) {
            result = { error: data.error };
        } else {
            result = { output: data.output };
        }
    });
    setTimeout(() => {
        return res.json({
            result
        });
    }, 500);

});




app.post('/ccompiler', (req, res) => {
    var envData = { OS: "linux", cmd: "g++", options: { timeout: 1000 } };
    code = req.body.code;
    input = req.body.arg.trim();
    var result = '';
    if (!input) {
        compiler.compileCPP(envData, code, function (data) {
            if (data.error) {
                result = { error: data.error };
            } else {
                result = { output: data.output };
            }
            return res.status(200).send(result);
        });
    }
    else {
        compiler.compileCPPWithInput(envData, code, input, function (data) {
            if (data.error) {
                result = { error: data.error };
            } else {
                result = { output: data.output };
            }
            return res.status(200).send(result);
        });
    }
})

app.post('/csharpcompiler', (req, res) => {
    var envData = { OS: "linux", cmd: "g++", options: { timeout: 1000 } };
    code = req.body.code;
    input = req.body.arg.trim();
    var result = '';
    if (!input) {
        compiler.compileCS(envData, code, function (data) {
            if (data.error) {
                result = { error: data.error };
            } else {
                result = { output: data.output };
            }
            return res.status(200).send(result);
        });
    }
    else {
        compiler.compileCSWithInput(envData, code, input, function (data) {
            if (data.error) {
                result = { error: data.error };
            } else {
                result = { output: data.output };
            }
            return res.status(200).send(result);
        });
    }

})

app.post('/pcompiler', async (req, res) => {
    var envData = { OS: "linux" };
    code = req.body.code;
    input = req.body.arg.trim();
    var result = '';
    if (!input) {
        await compiler.compilePython(envData, code, function (data) {
            if (data.error) {
                result = { error: data.error };
            } else {
                result = { output: data.output };
            }
            return res.status(200).send(result);
        });
    }
    else {
        await compiler.compilePythonWithInput(envData, code, input, function (data) {
            if (data.error) {
                result = { error: data.error };
            } else {
                result = { output: data.output };
            }
            return res.status(200).send(result);
        });
    }
})

app.post('/jcompiler', (req, res) => {
    var envData = { OS: "linux" };
    code = req.body.code;
    input = req.body.arg.trim();
    var result = '';
    if (!input) {
        compiler.compileJava(envData, code, function (data) {
            // res.send(data);
            if (data.error) {
                result = { error: data.error };
            } else {
                result = { output: data.output };
            }
            return res.send(result);
        });
    }
    else {
        compiler.compileJavaWithInput(envData, code, input, function (data) {
            if (data.error) {
                result = { error: data.error };
            } else {
                result = { output: data.output };
            }
            return res.status(200).send(result);
        });
    }

})

app.listen(2501, () => {

    console.log("Server is Running at port 2500")
})
