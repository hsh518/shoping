const Mock = require('mockjs');
const Random = Mock.Random
Mock.mock('/shoping/list', 'post' ,{
    'list|20': [{
        'id|+1':1,
        'imgUrl': Random.image('300x300', Random.color() , Random.color(), 'shop'),
        'tag':{
            'tag1|1': true,
            'tag2|1': true,
            'tag3|1':true
        },
        'title|+1': Random.cparagraph(5, 8),
        'num|1-1000':1
    }]
});
Mock.mock('/shoping/list1', 'post', () => {
        let list = [];
        for (let i = 0; i < 20; i++) {
            list.push({
                id: i,
                'imgUrl': Random.image('300x300', Random.color() , Random.color(), 'shop'),
                'tag':{
                    tag1: Random.boolean(),
                    tag2: Random.boolean(),
                    tag3:Random.boolean()
                },
                'title': Random.cparagraph(5, 8),
                'num':Random.natural(0, 5000)
            })
        }
        return list
    }
);