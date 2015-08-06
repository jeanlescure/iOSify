var class_name = 'MyCube';
var fs = require('fs');

fs.readFile('dist/temp.html', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  
  h_file = '#import <Foundation/Foundation.h>\n\n@interface ' + class_name + ' : NSObject\n\n@property (strong, nonatomic) NSString *moduleString;\n\n- (' + class_name + ' *)init;\n\n@end';
  
  fs.writeFile('dist/' + class_name + '.h', h_file, function (err) {
    if (err) return console.log(err);
  });
  
  data = data.replace(/\\/g, '\\\\');
  data = data.replace(/"/g, '\\"');
  data = data.replace(/\r\n|\n/g, '\\n');
  data = data.replace(/\s{2,}/g, ' ');
  data = '#import "' + class_name + '.h"\n\n@implementation ' + class_name + '\n\n- (' + class_name + ' *)init{\n\tself.moduleString = @"' + data + '";\n\t\n\treturn self;\n}\n\n@end';
  
  fs.writeFile('dist/' + class_name + '.m', data, function (err) {
    if (err) return console.log(err);
  });
});

fs.unlink('dist/temp.html', function (err) {
  if (err) console.log(err);
});