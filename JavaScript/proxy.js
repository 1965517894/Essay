// 使用代理拦截动态属性
// new Proxy(target, handler)
// target: 被 Proxy 代理虚拟化的对象

// 题目：
// const r1 = add[1][2][3] + 4; //预期结果 10
// const r2 = add[10][20][30] + 40; //预期结果 100
// const r3 = add[100][200][300] + 400; //预期结果 100
// 问：add怎么实现

const unit = function (value = 0) {
    return new Proxy(
        {},
        {
            get(target, prop) {
                if (prop === Symbol.toPrimitive) {
                    return () => value;
                }
                return unit(value + Number(prop));
            },
        }
    );
};
const add = unit();

const r1 = add[1][2][3] + 4; //预期结果 10
const r2 = add[10][20][30] + 40; //预期结果 100
const r3 = add[100][200][300] + 400; //预期结果 100

console.log(r1);
console.log(r2);
console.log(r3);
