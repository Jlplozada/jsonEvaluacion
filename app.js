// -listar los usuarios por ciudades  ( )
// -listar las materias por ususarios ( )
// -mostrar el promedio de las notas de cada usuario ()
// -listar los usuarios que matricularon materias ()

import { solicitud} from "./conector.js";
const cargar = async () => {
    const ciudad =await  solicitud("ciudades");
    const respuesta = await Promise.all(
        ciudad.map(async (ciudades)=>{
            const usuario=await solicitud(`usuarios?cityId=${ciudad.id}`)
            usuario.map(async (usuario) => {
                const materiasUs= await solicitud(`materia_usuario?userId=${usuario.id}`);
                materiasUs.map(async(materiasUs)=>{
                    const nota=await solicitud(`notas?subjectUserId=${usuario.id}`);
                    return {...usuario,materiasUs,nota}
                })
            })
        })
    );
    return ciudad;
};
cargar().then((a)=>{
    console.log(a);
});



