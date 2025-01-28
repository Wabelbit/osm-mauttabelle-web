const loadMauttabelle = async function (file) {
    const reader = new FileReader();
    reader.onload = async function (e) {
        await unzipFile(e.target.result);
    };
    reader.readAsArrayBuffer(file)
}

const unzipFile = async function (file) {
    // TODO
}