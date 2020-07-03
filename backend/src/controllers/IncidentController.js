const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        // caso nao seja passada a página será mostrada a página 1
        const { page = 1 } = request.query;

        // pegar o número total de casos
        const count = await connection('incidents').count().first();

        /*
         * mostrar de 5 em 5 "casos".
         * na pag 1: (1 - 1) * 5 = 0, ou seja, vai começar do caso 0.
         * na pag 2: (2 - 1) * 5 = 5, ou seja, vai começar do caso 5.
         * o "join" mostrado abaixo é para trazer os dados da ong relacionada com aquele "caso".  
        */
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        // por padrão, o total de páginas é retornado no header
        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body;

        // informações relacionadas a autenticação, como login são passadas via Header
        const ong_id =  request.headers.authorization; // este ".authorization" é devido ao nome dado no Insomnia


        const result = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        const id = result[0];
        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;

        /*
         * para verificar se a ong que está tentando deletar o caso, foi a ong que o criou.
         * caso contrário deve ser impedido!
        */
       const ong_id = request.headers.authorization;

       // pega a coluna "ong_id" do elemento que tiver o "id" igual ao "id" passado no "params"
       const incident = await connection('incidents').where('id', id).select('ong_id').first();

       if(incident.ong_id !== ong_id) {
           return response.status(401).json({ error: "Operation not permitted!" });
       }

       await connection('incidents').where('id', id).delete();

       /*
        * status 204: usamos quando vamos retornar uma resposta ao frontend sem conteúdo.
        * send: para enviar a resposta sem corpo
       */ 
       return response.status(204).send();
    }
}

