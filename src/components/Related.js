import { useSelector } from "react-redux";

import { selectAllMezmur, selectMezmurById, useGetMezmursQuery } from "../app/MezmurSlice";
import { useGetZemarisQuery } from "../app/ZemariSlice";
import { useGetCategorysQuery } from "../app/CategorySlice";

export const Tezamach = (id) => {
    useGetMezmursQuery();
    useGetZemarisQuery();
    useGetCategorysQuery();
    let mezmur = useSelector((state) => selectMezmurById(state, id));
    let mezmurs = useSelector(selectAllMezmur);

    let sameCat = mezmurs.filter((m) => m.category.name == mezmur.category.name);

    let sameZemari = mezmurs.filter((m) => (m.zemari.name == mezmur.zemari.name));

    let sameCatAndZemari = sameCat.filter((m) => (m.zemari.name == mezmur.zemari.name));

    let sameCatWOsZ = sameCat.filter(m => !sameCatAndZemari.includes(m))
    let sameCatWOsC = sameZemari.filter(m => (!sameCatAndZemari.includes(m)))

    let tezm1 = sameCatAndZemari.concat(sameCatWOsZ).concat(sameCatWOsC);
    let tezm2 = tezm1.filter(m => m._id != id);
    return tezm2



};
