var cbFn = function (value, cb) 
{
    if (value < 5) return cb(new Error('value shouldn\'t less then 5'));

    cb(null, value * 2, value * 3);
};

it('basic', function () 
{
    var promiseFn = promisify(cbFn);

    promiseFn(4).catch(err => 
    {
        expect(err).to.be.an('error');
    });

    promiseFn(5).then(value => 
    {
        expect(value).to.equal(10);
    });
});

it('multiArgs', function () 
{
    var promiseFn = promisify(cbFn, true);

    promiseFn(5).then(values => 
    {
        expect(values[0]).to.equal(10);
        expect(values[1]).to.equal(15);
    });
});