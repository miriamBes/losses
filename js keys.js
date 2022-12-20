// JAVASCRIPT - this

// באופן רגיל, בפונקציה רגילה ה this 
// הוא האובייקט שהפעיל את הפונקציה בפועל, ולא בהכרח האוביקט שבתוכו היא הוגדרה.
// דוגמאות:

let obj = {
    a: 34,
    someFunc(arr) {
        arr.map(function(x) {
            // פונקציה זו לא תעבוד כפי המצופה!! מכיוון שלא האוביקט הוא זה שהפעיל אותה
            // אלא היא הופעלה מתוך פונקציית Map
            // ה this שלה
            // הוא ה this הגלובלי
            // אם יהיה משתנה גלובלי בשם הזה, הפונקציה תשתמש בו
            return x + this.a;
        })
    }
}

// צורת הפיתרון למקרה הנ"ל בכתיב ישן של js:
let obj1 = {
    a: 34,
    someFunc(arr) {
        // לכדנו את המשתנה this
        // בתוך משתנה אחר, שערכו לא ישתנה בתוך פונקציה פנימית
        let that = this;
        arr.map(function(x) {
            // יש להקפיד להשתמש כאן במשתנה that 
            // שמכיל את ה this של האובייקט
            return x + that.a;
        })
    }
}

// צורת הפיתרון ב js מתקדם - es6+
// בגירסה 6 נוספה היכולת לכתוב פונקצית חץ.
// התכונה העיקרית של הפונקציה הזו, היא שה this 
// שבתוכה אינו משתנה - היא מתייחסת ל this
// של המקום שבתוכו היא הוגדרה
// לכן הדוגמא הבאה תעבוד בדיוק כפי המצופה
let obj3 = {
    a: 34,
    someFunc(arr) {
        arr.map((x) => {
            
            return x + this.a;
        })
    }
}

// יש לשים לב למקומות שבהם אסור להשתמש בפונקציית חץ - המקומות שבהם אנחנו כן רוצים לקבל את ה this הייחודי לפונקציה
// בעיקר: פונקציות על אובייקט ופונקציה קונסטרקטור.
// בדוגמא הבאה הפונקציה לא תעבוד כפי המצופה, מכיוון שהפונקציה someFunc
// הוגדרה כפונקציית חץ, ולכן לא תקבל את ה this של האובייקט שהפעיל אותה
let obj4 = {
    a: 34,
    someFunc: (arr) => {
        arr.map((x) => {
            
            return x + this.a;
        })
    }
}

let ob = {
    b: 4,
    getB() {
        return this.b;
    }
}

let getB = ob.getB;
getB()  // פונקציה זו לא תחזיר את הערך הרצוי, כי היא איבדה את ה this המקורי שלה

let oc = {
    b: 5,
    getB: ob.getB,
}

oc.getB()  // 5

// יש אפשרות להפעיל את הפונקציה ולשלוח לה את הערך שהוא אמור להיות ה this שלה
// נעשה ע"י הפונקציות call / apply
getB.call({b : 6}) // 6
getB.apply({ b: 8 }) // 8



const getB7 = getB.bind({b: 7}); // יצירה של פונקציה שקשורה ל this מסוים מכל מקום שבו היא תיקרא

getB7() // 7

