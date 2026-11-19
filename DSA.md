const str = "aabcdefabcgf"


let strMap = new Map()
let r = 0
let l = 0
let len = 0
let start =0

while (r < str.length) {
    if (!strMap.has(str[r])) {
        strMap.set(str[r], r)
        let maxi = r - l + 1
        if (maxi > len) {
            len = maxi
            start =l
        }
        r = r + 1
    } else {
        let found = strMap.get(str[r])
        if (found >= l) {
            l = found + 1
        }
        strMap.set(str[r], r)
        let maxi = r - l + 1
        if (maxi > len) {
            len = maxi
            start= l
        }
        r = r + 1
    }
}
console.log(str.slice(start, start+len))
console.log(strMap.size)


