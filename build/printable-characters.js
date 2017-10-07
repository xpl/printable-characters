"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

const ansiEscapeCode = '[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]',
      zeroWidthCharacterExceptNewline = '\u0000-\u0008\u000B-\u0019\u001b\u009b\u00ad\u200b\u2028\u2029\ufeff\ufe00-\ufe0f',
      zeroWidthCharacter = '\n' + zeroWidthCharacterExceptNewline,
      zeroWidthCharactersExceptNewline = new RegExp('(?:' + ansiEscapeCode + ')|[' + zeroWidthCharacterExceptNewline + ']', 'g'),
      zeroWidthCharacters = new RegExp('(?:' + ansiEscapeCode + ')|[' + zeroWidthCharacter + ']', 'g'),
      partition = new RegExp('((?:' + ansiEscapeCode + ')|[\t' + zeroWidthCharacter + '])?([^\t' + zeroWidthCharacter + ']*)', 'g');

module.exports = {

    zeroWidthCharacters,

    ansiEscapeCodes: new RegExp(ansiEscapeCode, 'g'),

    strlen: s => Array.from(s.replace(zeroWidthCharacters, '')).length,

    isBlank: s => s.replace(zeroWidthCharacters, '').replace(/\s/g, '').length === 0,

    blank: s => Array.from(s.replace(zeroWidthCharactersExceptNewline, '')).map(x => x === '\t' || x === '\n' ? x : ' ').join(''),

    partition(s) {
        for (var m, spans = []; partition.lastIndex !== s.length && (m = partition.exec(s));) {
            spans.push([m[1] || '', m[2]]);
        }
        partition.lastIndex = 0; // reset
        return spans;
    },

    first(s, n) {

        let result = '',
            length = 0;

        for (const _ref of module.exports.partition(s)) {
            var _ref2 = _slicedToArray(_ref, 2);

            const nonPrintable = _ref2[0];
            const printable = _ref2[1];

            const text = printable.substr(0, n - length);
            result += nonPrintable + text;
            length += text.length;
        }

        return result;
    }
};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3ByaW50YWJsZS1jaGFyYWN0ZXJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FBRUEsTUFBTSxpQkFBbUMsNEVBQXpDO0FBQUEsTUFDTSxrQ0FBbUMsbUZBRHpDO0FBQUEsTUFFTSxxQkFBbUMsT0FBTywrQkFGaEQ7QUFBQSxNQUdNLG1DQUFtQyxJQUFJLE1BQUosQ0FBWSxRQUFRLGNBQVIsR0FBeUIsS0FBekIsR0FBaUMsK0JBQWpDLEdBQW1FLEdBQS9FLEVBQW9GLEdBQXBGLENBSHpDO0FBQUEsTUFJTSxzQkFBbUMsSUFBSSxNQUFKLENBQVksUUFBUSxjQUFSLEdBQXlCLEtBQXpCLEdBQWlDLGtCQUFqQyxHQUFzRCxHQUFsRSxFQUF1RSxHQUF2RSxDQUp6QztBQUFBLE1BS00sWUFBbUMsSUFBSSxNQUFKLENBQVksU0FBUyxjQUFULEdBQTBCLE9BQTFCLEdBQW9DLGtCQUFwQyxHQUF5RCxVQUF6RCxHQUFzRSxrQkFBdEUsR0FBMkYsS0FBdkcsRUFBOEcsR0FBOUcsQ0FMekM7O0FBT0EsT0FBTyxPQUFQLEdBQWlCOztBQUViLHVCQUZhOztBQUliLHFCQUFpQixJQUFJLE1BQUosQ0FBWSxjQUFaLEVBQTRCLEdBQTVCLENBSko7O0FBTWIsWUFBUSxLQUFLLE1BQU0sSUFBTixDQUFZLEVBQUUsT0FBRixDQUFXLG1CQUFYLEVBQWdDLEVBQWhDLENBQVosRUFBaUQsTUFOakQ7O0FBUWIsYUFBUyxLQUFLLEVBQUUsT0FBRixDQUFXLG1CQUFYLEVBQWdDLEVBQWhDLEVBQ0UsT0FERixDQUNXLEtBRFgsRUFDa0IsRUFEbEIsRUFFRSxNQUZGLEtBRWEsQ0FWZDs7QUFZYixXQUFPLEtBQUssTUFBTSxJQUFOLENBQVksRUFBRSxPQUFGLENBQVcsZ0NBQVgsRUFBNkMsRUFBN0MsQ0FBWixFQUNNLEdBRE4sQ0FDVyxLQUFPLE1BQU0sSUFBUCxJQUFpQixNQUFNLElBQXhCLEdBQWlDLENBQWpDLEdBQXFDLEdBRHJELEVBRU0sSUFGTixDQUVZLEVBRlosQ0FaQzs7QUFnQmIsY0FBVyxDQUFYLEVBQWM7QUFDVixhQUFLLElBQUksQ0FBSixFQUFPLFFBQVEsRUFBcEIsRUFBeUIsVUFBVSxTQUFWLEtBQXdCLEVBQUUsTUFBM0IsS0FBdUMsSUFBSSxVQUFVLElBQVYsQ0FBZ0IsQ0FBaEIsQ0FBM0MsQ0FBeEIsR0FBeUY7QUFBRSxrQkFBTSxJQUFOLENBQVksQ0FBQyxFQUFFLENBQUYsS0FBUSxFQUFULEVBQWEsRUFBRSxDQUFGLENBQWIsQ0FBWjtBQUFpQztBQUM1SCxrQkFBVSxTQUFWLEdBQXNCLENBQXRCLENBRlUsQ0FFYztBQUN4QixlQUFPLEtBQVA7QUFDSCxLQXBCWTs7QUFzQmIsVUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhOztBQUVULFlBQUksU0FBUyxFQUFiO0FBQUEsWUFBaUIsU0FBUyxDQUExQjs7QUFFQSwyQkFBd0MsT0FBTyxPQUFQLENBQWUsU0FBZixDQUEwQixDQUExQixDQUF4QyxFQUFzRTtBQUFBOztBQUFBLGtCQUExRCxZQUEwRDtBQUFBLGtCQUE1QyxTQUE0Qzs7QUFDbEUsa0JBQU0sT0FBTyxVQUFVLE1BQVYsQ0FBa0IsQ0FBbEIsRUFBcUIsSUFBSSxNQUF6QixDQUFiO0FBQ0Esc0JBQVUsZUFBZSxJQUF6QjtBQUNBLHNCQUFVLEtBQUssTUFBZjtBQUNIOztBQUVELGVBQU8sTUFBUDtBQUNIO0FBakNZLENBQWpCIiwiZmlsZSI6InByaW50YWJsZS1jaGFyYWN0ZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IGFuc2lFc2NhcGVDb2RlICAgICAgICAgICAgICAgICAgID0gJ1tcXHUwMDFiXFx1MDA5Yl1bWygpIzs/XSooPzpbMC05XXsxLDR9KD86O1swLTldezAsNH0pKik/WzAtOUEtUFJaY2YtbnFyeT0+PF0nXG4gICAgLCB6ZXJvV2lkdGhDaGFyYWN0ZXJFeGNlcHROZXdsaW5lICA9ICdcXHUwMDAwLVxcdTAwMDhcXHUwMDBCLVxcdTAwMTlcXHUwMDFiXFx1MDA5YlxcdTAwYWRcXHUyMDBiXFx1MjAyOFxcdTIwMjlcXHVmZWZmXFx1ZmUwMC1cXHVmZTBmJ1xuICAgICwgemVyb1dpZHRoQ2hhcmFjdGVyICAgICAgICAgICAgICAgPSAnXFxuJyArIHplcm9XaWR0aENoYXJhY3RlckV4Y2VwdE5ld2xpbmVcbiAgICAsIHplcm9XaWR0aENoYXJhY3RlcnNFeGNlcHROZXdsaW5lID0gbmV3IFJlZ0V4cCAoJyg/OicgKyBhbnNpRXNjYXBlQ29kZSArICcpfFsnICsgemVyb1dpZHRoQ2hhcmFjdGVyRXhjZXB0TmV3bGluZSArICddJywgJ2cnKVxuICAgICwgemVyb1dpZHRoQ2hhcmFjdGVycyAgICAgICAgICAgICAgPSBuZXcgUmVnRXhwICgnKD86JyArIGFuc2lFc2NhcGVDb2RlICsgJyl8WycgKyB6ZXJvV2lkdGhDaGFyYWN0ZXIgKyAnXScsICdnJylcbiAgICAsIHBhcnRpdGlvbiAgICAgICAgICAgICAgICAgICAgICAgID0gbmV3IFJlZ0V4cCAoJygoPzonICsgYW5zaUVzY2FwZUNvZGUgKyAnKXxbXFx0JyArIHplcm9XaWR0aENoYXJhY3RlciArICddKT8oW15cXHQnICsgemVyb1dpZHRoQ2hhcmFjdGVyICsgJ10qKScsICdnJylcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgICB6ZXJvV2lkdGhDaGFyYWN0ZXJzLFxuXG4gICAgYW5zaUVzY2FwZUNvZGVzOiBuZXcgUmVnRXhwIChhbnNpRXNjYXBlQ29kZSwgJ2cnKSxcblxuICAgIHN0cmxlbjogcyA9PiBBcnJheS5mcm9tIChzLnJlcGxhY2UgKHplcm9XaWR0aENoYXJhY3RlcnMsICcnKSkubGVuZ3RoLFxuXG4gICAgaXNCbGFuazogcyA9PiBzLnJlcGxhY2UgKHplcm9XaWR0aENoYXJhY3RlcnMsICcnKVxuICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlICgvXFxzL2csICcnKVxuICAgICAgICAgICAgICAgICAgIC5sZW5ndGggPT09IDAsXG5cbiAgICBibGFuazogcyA9PiBBcnJheS5mcm9tIChzLnJlcGxhY2UgKHplcm9XaWR0aENoYXJhY3RlcnNFeGNlcHROZXdsaW5lLCAnJykpXG4gICAgICAgICAgICAgICAgICAgICAubWFwICh4ID0+ICgoeCA9PT0gJ1xcdCcpIHx8ICh4ID09PSAnXFxuJykpID8geCA6ICcgJylcbiAgICAgICAgICAgICAgICAgICAgIC5qb2luICgnJyksXG5cbiAgICBwYXJ0aXRpb24gKHMpIHtcbiAgICAgICAgZm9yICh2YXIgbSwgc3BhbnMgPSBbXTsgKHBhcnRpdGlvbi5sYXN0SW5kZXggIT09IHMubGVuZ3RoKSAmJiAobSA9IHBhcnRpdGlvbi5leGVjIChzKSk7KSB7IHNwYW5zLnB1c2ggKFttWzFdIHx8ICcnLCBtWzJdXSkgfVxuICAgICAgICBwYXJ0aXRpb24ubGFzdEluZGV4ID0gMCAvLyByZXNldFxuICAgICAgICByZXR1cm4gc3BhbnNcbiAgICB9LFxuXG4gICAgZmlyc3QgKHMsIG4pIHtcblxuICAgICAgICBsZXQgcmVzdWx0ID0gJycsIGxlbmd0aCA9IDBcblxuICAgICAgICBmb3IgKGNvbnN0IFtub25QcmludGFibGUsIHByaW50YWJsZV0gb2YgbW9kdWxlLmV4cG9ydHMucGFydGl0aW9uIChzKSkge1xuICAgICAgICAgICAgY29uc3QgdGV4dCA9IHByaW50YWJsZS5zdWJzdHIgKDAsIG4gLSBsZW5ndGgpXG4gICAgICAgICAgICByZXN1bHQgKz0gbm9uUHJpbnRhYmxlICsgdGV4dFxuICAgICAgICAgICAgbGVuZ3RoICs9IHRleHQubGVuZ3RoXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgfVxufSJdfQ==