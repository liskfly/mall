export const getSku = (data) => {
    let tree = [];
    let sku = {};
    let list = [];
    if (data.attr.length > 0) {
        data.attr.forEach((t, i) => {
            let v = [];
            t.attr_value.forEach((t) => {
                v.push({ id: t.attr, name: t.attr });
            });
            tree.push({
                k: t.attr_name,
                k_s: "s" + (i + 1),
                v,
            });
        });

        if (tree.length > 1) {
            tree[0].v.forEach((t1, i1) => {
                tree[1].v.forEach((t2, i2) => {
                    list.push({
                        id: (i1 + 1) * (i2 + 1),
                        s1: t1.id, // 规格类目 k_s 为 s1 的对应规格值 id
                        s2: t2.id, // 规格类目 k_s 为 s2 的对应规格值 id
                        price: data.cash_coupon_deduction * 100, // 价格（单位分）
                        stock_num: data.stock, //
                    });
                });
            });
        } else {
            tree[0].v.forEach((t, i) => {
                list.push({
                    id: i + 1,
                    s1: t.id,
                    price: data.cash_coupon_deduction * 100,
                    stock_num: data.stock,
                });
            });
        }
    } else {
        // let a = data.store_info.match(/(\D*)/)[0]
        // console.log(a);
        tree = [{
            k: "规格",
            k_s: "s1",
            v: [{
                id: data.unit_name,
                value: data.unit_name,
            }]
        }]
        tree[0].v.forEach((t, i) => {
            list.push({
                id: i + 1,
                s1: t.id,
                price: data.cash_coupon_deduction * 100,
                stock_num: data.stock,
            });
        });
    }

    sku = {
        tree,
        list,
        price: data.cash_coupon_deduction,
        stock_num: data.stock,
        collection_id: data.product_id,
        none_sku: false,
        hide_stock: false,
    };
    return sku
}