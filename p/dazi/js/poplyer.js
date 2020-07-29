define(['jquery', 'Vue'], function($, Vue) {
    return ({
        template: `
        <div>
            <div class="TanChuCeng">
                
            </div>            
        </div>
        `,
        data: function() {
            return {
                PiFu: {
                    defult: true,
                }
            }
        },

        created() {
            window.localStorage.setItem('AdminInfo', JSON.stringify(reslogin.data.data));
            console.log('skin')
        }
    })
});