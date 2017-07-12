var request = require('request');

exports.list = function (req, res, next) {
  request.get(
    {url:'http://localhost:8080/webs'},
    function optionalCallback(err, httpResponse, body) {
      if (err) {
        return console.error('get failed:', err);
      }
      console.log('Get successful! Server responded with:', body);
      res.render('webs/index', {webs: body});
    }
  );
};

exports.findById = function (req, res, next) {
  request.get(
    {url:'http://localhost:8080/webs/'+req.params.webId},
    function optionalCallback(err, httpResponse, body) {
      if (err) {
        return console.error('get failed:', err);
      }
      console.log('Get successful! Server responded with:', body);
      res.render('webs/show', {web: body});
    }
  );
};

exports.formAddWeb = function (req, res, next) {
  res.render('webs/new');
};

exports.addWeb = function (req, res, next) {
  var form = {
    url: req.body.url,
    genre: req.body.genre
  };
 request.get(
    {url:'http://localhost:8080/url', form:form},
    function optionalCallback(err, httpResponse, body) {
      if (err) {
        return console.error('get failed:', err);
      }
      console.log('Get by url successful! Server responded with:', body);
      if (body == 0) {
        request.post(
          {url:'http://localhost:8080/webs', form:form},
          function optionalCallback(err, httpResponse, body) {
            if (err) {
              return console.error('upload failed:', err);
            }
            console.log('Upload successful! Server responded with:', body);
            res.redirect('/webs');
          }
        );
      } else {
        var alert = 'The web with url ' + req.body.url + ' already exists!';
        res.render('webs/new', {alert: alert});
      }
    }
  );
};

exports.deleteWeb = function (req, res, next) {
  request.del(
    {url:'http://localhost:8080/webs/'+req.params.webId},
    function optionalCallback(err, httpResponse, body) {
      if (err) {
        return console.error('delete failed:', err);
      }
      console.log('Delete successful! Server responded with:', body);
      res.redirect('/webs');
    }
  );
};

exports.addFilterToWeb = function (req, res, next) {
  var form = {
    pattern: req.body.pattern,
    filterType: req.body.filterType
  };
  console.log("addFilterToWeb: " + form);
  request.put(
    {url:'http://localhost:8080/webs/'+req.params.webId, form: form},
    function optionalCallback(err, httpResponse, body) {
      if (err) {
        return console.error('upload failed:', err);
      }
      console.log('Upload successful! Server responded with:', body);
      res.redirect('/webs/'+req.params.webId);
    }
  );
};

exports.formUpdateFilterOfWeb = function (req, res, next) {
  request.get(
    {url:'http://localhost:8080/webs/'+req.params.webId+'/'+req.params.filterId},
    function optionalCallback(err, httpResponse, body) {
      if (err) {
        return console.error('get failed:', err);
      }
      console.log('Get successful! Server responded with:', body);
      res.render('webs/filter', {webId: req.params.webId, filter: body});
    }
  );
};

exports.updateFilterOfWeb = function (req, res, next) {
  var form = {
    pattern: req.body.pattern,
    filterType: req.body.filterType
  };
  request.put(
    {url:'http://localhost:8080/webs/'+req.params.webId+'/'+req.params.filterId, form: form},
    function optionalCallback(err, httpResponse, body) {
      if (err) {
        return console.error('update failed:', err);
      }
      console.log('Update successful! Server responded with:', body);
      res.redirect('/webs/'+req.params.webId);
    }
  );
};

exports.deleteFilterOfWeb = function (req, res, next) {
  request.del(
    {url:'http://localhost:8080/webs/'+req.params.webId+'/'+req.params.filterId},
    function optionalCallback(err, httpResponse, body) {
      if (err) {
        return console.error('delete failed:', err);
      }
      console.log('Delete successful! Server responded with:', body);
      res.redirect('/webs/'+req.params.webId);
    }
  );
};