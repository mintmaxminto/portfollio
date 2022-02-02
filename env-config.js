const prod = process.env.NODE_ENV === 'production';

module.exports = {
    'process.env.BASE_URL': prod ? 'https://waqashassan.herokuapp.com' : 'http://localhost:3000',
    'process.env.NAMESPACE': 'https://waqashassan.herokuapp.com',
    'process.env.CLIENT_ID': 'Y1PBvfKZKgRIngUdfa0HLzSWxhZ9bJwj'
}