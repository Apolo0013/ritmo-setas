from random import randint

keyList = [
{
    "key": 'ArrowUp',
    "direction": '0deg'
},
{
    "key":'ArrowRight',
    "direction": '90deg'
},
{
    "key": 'ArrowDown',
    "direction": '180deg'
},
{
    "key": 'ArrowLeft',
    "direction": '270deg'
}
]

direcao = ['0deg', '90deg', '180deg', '270deg']
keys = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft']

newlist = []

for i in range(10):
    sortKey = randint(0, 3)
    sortDirection = randint(0, 3)
    newlist.append({
        "key": keys[sortDirection],
        "direction": direcao[sortDirection]
    })
print(newlist)
