function EurotoInt(k){

    let length = k.length
    k=k.split("")
    k=k.splice(0,length-2);
    k = k.join("")
    k = k.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
    return k
}

export { EurotoInt };