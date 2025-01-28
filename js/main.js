"use strict";

let xxx
const loadMauttabelle = async function (file) {
    const excelData = await unzipFile(file);
    const workbook = XLSX.read(await excelData.arrayBuffer());
    console.log("workbook", workbook);

    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    // TODO: massage the data to make it usable
}

const unzipFile = async function (file) {
    const entries = await (new zip.ZipReader(new zip.BlobReader(file))).getEntries("utf-8");
    console.debug("entries", entries)
    const excelFiles = entries.filter(entry => entry.filename.endsWith(".xlsx"));
    if (excelFiles.length !== 1) {
        throw "Die ZIP Datei muss exakt 1 Excel-Datei enthalten, aber es gibt " + excelFiles.length;
    }
    const progressElem = document.getElementById("unzip-progress");
    progressElem.hidden = false
    const data = await excelFiles[0].getData(new zip.BlobWriter(), {
        onprogress: onUnzipProgress
    });
    console.debug("data", data);
    return data
}

const onUnzipProgress = function (index, max) {
    progressElem.innerText = `${max / 1000} KB, ${(index / max) * 100}% geladen`;
}
