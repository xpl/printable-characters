"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

const ansiEscapeCode = '[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]',
      zeroWidthCharacterExceptNewline = '\u0000-\u0008\u000B-\u0019\u001b\u009b\u00ad\u200b\u2028\u2029\ufeff',
      zeroWidthCharacter = '\n' + zeroWidthCharacterExceptNewline,
      zeroWidthCharactersExceptNewline = new RegExp('(?:' + ansiEscapeCode + ')|[' + zeroWidthCharacterExceptNewline + ']', 'g'),
      zeroWidthCharacters = new RegExp('(?:' + ansiEscapeCode + ')|[' + zeroWidthCharacter + ']', 'g'),
      partition = new RegExp('((?:' + ansiEscapeCode + ')|[\t' + zeroWidthCharacter + '])?([^\t' + zeroWidthCharacter + ']*)', 'g');

module.exports = {

    zeroWidthCharacters,

    ansiEscapeCodes: new RegExp(ansiEscapeCode, 'g'),

    strlen: s => s.replace(zeroWidthCharacters, '').length,

    isBlank: s => s.replace(zeroWidthCharacters, '').replace(/\s/g, '').length === 0,

    blank: s => s.replace(zeroWidthCharactersExceptNewline, '').replace(/[^\t\n]/g, ' '),

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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3ByaW50YWJsZS1jaGFyYWN0ZXJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FBRUEsTUFBTSxpQkFBbUMsNEVBQXpDO0FBQUEsTUFDTSxrQ0FBbUMsc0VBRHpDO0FBQUEsTUFFTSxxQkFBbUMsT0FBTywrQkFGaEQ7QUFBQSxNQUdNLG1DQUFtQyxJQUFJLE1BQUosQ0FBWSxRQUFRLGNBQVIsR0FBeUIsS0FBekIsR0FBaUMsK0JBQWpDLEdBQW1FLEdBQS9FLEVBQW9GLEdBQXBGLENBSHpDO0FBQUEsTUFJTSxzQkFBbUMsSUFBSSxNQUFKLENBQVksUUFBUSxjQUFSLEdBQXlCLEtBQXpCLEdBQWlDLGtCQUFqQyxHQUFzRCxHQUFsRSxFQUF1RSxHQUF2RSxDQUp6QztBQUFBLE1BS00sWUFBbUMsSUFBSSxNQUFKLENBQVksU0FBUyxjQUFULEdBQTBCLE9BQTFCLEdBQW9DLGtCQUFwQyxHQUF5RCxVQUF6RCxHQUFzRSxrQkFBdEUsR0FBMkYsS0FBdkcsRUFBOEcsR0FBOUcsQ0FMekM7O0FBT0EsT0FBTyxPQUFQLEdBQWlCOztBQUViLHVCQUZhOztBQUliLHFCQUFpQixJQUFJLE1BQUosQ0FBWSxjQUFaLEVBQTRCLEdBQTVCLENBSko7O0FBTWIsWUFBUSxLQUFLLEVBQUUsT0FBRixDQUFXLG1CQUFYLEVBQWdDLEVBQWhDLEVBQ0UsTUFQRjs7QUFTYixhQUFTLEtBQUssRUFBRSxPQUFGLENBQVcsbUJBQVgsRUFBZ0MsRUFBaEMsRUFDRSxPQURGLENBQ1csS0FEWCxFQUNrQixFQURsQixFQUVFLE1BRkYsS0FFYSxDQVhkOztBQWFiLFdBQU8sS0FBSyxFQUFFLE9BQUYsQ0FBVyxnQ0FBWCxFQUE2QyxFQUE3QyxFQUNFLE9BREYsQ0FDVyxVQURYLEVBQ3VCLEdBRHZCLENBYkM7O0FBZ0JiLGNBQVcsQ0FBWCxFQUFjO0FBQ1YsYUFBSyxJQUFJLENBQUosRUFBTyxRQUFRLEVBQXBCLEVBQXlCLFVBQVUsU0FBVixLQUF3QixFQUFFLE1BQTNCLEtBQXVDLElBQUksVUFBVSxJQUFWLENBQWdCLENBQWhCLENBQTNDLENBQXhCLEdBQXlGO0FBQUUsa0JBQU0sSUFBTixDQUFZLENBQUMsRUFBRSxDQUFGLEtBQVEsRUFBVCxFQUFhLEVBQUUsQ0FBRixDQUFiLENBQVo7QUFBaUM7QUFDNUgsa0JBQVUsU0FBVixHQUFzQixDQUF0QixDQUZVLENBRWM7QUFDeEIsZUFBTyxLQUFQO0FBQ0gsS0FwQlk7O0FBc0JiLFVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYTs7QUFFVCxZQUFJLFNBQVMsRUFBYjtBQUFBLFlBQWlCLFNBQVMsQ0FBMUI7O0FBRUEsMkJBQXdDLE9BQU8sT0FBUCxDQUFlLFNBQWYsQ0FBMEIsQ0FBMUIsQ0FBeEMsRUFBc0U7QUFBQTs7QUFBQSxrQkFBMUQsWUFBMEQ7QUFBQSxrQkFBNUMsU0FBNEM7O0FBQ2xFLGtCQUFNLE9BQU8sVUFBVSxNQUFWLENBQWtCLENBQWxCLEVBQXFCLElBQUksTUFBekIsQ0FBYjtBQUNBLHNCQUFVLGVBQWUsSUFBekI7QUFDQSxzQkFBVSxLQUFLLE1BQWY7QUFDSDs7QUFFRCxlQUFPLE1BQVA7QUFDSDtBQWpDWSxDQUFqQiIsImZpbGUiOiJwcmludGFibGUtY2hhcmFjdGVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCBhbnNpRXNjYXBlQ29kZSAgICAgICAgICAgICAgICAgICA9ICdbXFx1MDAxYlxcdTAwOWJdW1soKSM7P10qKD86WzAtOV17MSw0fSg/OjtbMC05XXswLDR9KSopP1swLTlBLVBSWmNmLW5xcnk9PjxdJ1xuICAgICwgemVyb1dpZHRoQ2hhcmFjdGVyRXhjZXB0TmV3bGluZSAgPSAnXFx1MDAwMC1cXHUwMDA4XFx1MDAwQi1cXHUwMDE5XFx1MDAxYlxcdTAwOWJcXHUwMGFkXFx1MjAwYlxcdTIwMjhcXHUyMDI5XFx1ZmVmZidcbiAgICAsIHplcm9XaWR0aENoYXJhY3RlciAgICAgICAgICAgICAgID0gJ1xcbicgKyB6ZXJvV2lkdGhDaGFyYWN0ZXJFeGNlcHROZXdsaW5lXG4gICAgLCB6ZXJvV2lkdGhDaGFyYWN0ZXJzRXhjZXB0TmV3bGluZSA9IG5ldyBSZWdFeHAgKCcoPzonICsgYW5zaUVzY2FwZUNvZGUgKyAnKXxbJyArIHplcm9XaWR0aENoYXJhY3RlckV4Y2VwdE5ld2xpbmUgKyAnXScsICdnJylcbiAgICAsIHplcm9XaWR0aENoYXJhY3RlcnMgICAgICAgICAgICAgID0gbmV3IFJlZ0V4cCAoJyg/OicgKyBhbnNpRXNjYXBlQ29kZSArICcpfFsnICsgemVyb1dpZHRoQ2hhcmFjdGVyICsgJ10nLCAnZycpXG4gICAgLCBwYXJ0aXRpb24gICAgICAgICAgICAgICAgICAgICAgICA9IG5ldyBSZWdFeHAgKCcoKD86JyArIGFuc2lFc2NhcGVDb2RlICsgJyl8W1xcdCcgKyB6ZXJvV2lkdGhDaGFyYWN0ZXIgKyAnXSk/KFteXFx0JyArIHplcm9XaWR0aENoYXJhY3RlciArICddKiknLCAnZycpXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gICAgemVyb1dpZHRoQ2hhcmFjdGVycyxcblxuICAgIGFuc2lFc2NhcGVDb2RlczogbmV3IFJlZ0V4cCAoYW5zaUVzY2FwZUNvZGUsICdnJyksXG5cbiAgICBzdHJsZW46IHMgPT4gcy5yZXBsYWNlICh6ZXJvV2lkdGhDaGFyYWN0ZXJzLCAnJylcbiAgICAgICAgICAgICAgICAgIC5sZW5ndGgsXG5cbiAgICBpc0JsYW5rOiBzID0+IHMucmVwbGFjZSAoemVyb1dpZHRoQ2hhcmFjdGVycywgJycpXG4gICAgICAgICAgICAgICAgICAgLnJlcGxhY2UgKC9cXHMvZywgJycpXG4gICAgICAgICAgICAgICAgICAgLmxlbmd0aCA9PT0gMCxcblxuICAgIGJsYW5rOiBzID0+IHMucmVwbGFjZSAoemVyb1dpZHRoQ2hhcmFjdGVyc0V4Y2VwdE5ld2xpbmUsICcnKVxuICAgICAgICAgICAgICAgICAucmVwbGFjZSAoL1teXFx0XFxuXS9nLCAnICcpLFxuXG4gICAgcGFydGl0aW9uIChzKSB7XG4gICAgICAgIGZvciAodmFyIG0sIHNwYW5zID0gW107IChwYXJ0aXRpb24ubGFzdEluZGV4ICE9PSBzLmxlbmd0aCkgJiYgKG0gPSBwYXJ0aXRpb24uZXhlYyAocykpOykgeyBzcGFucy5wdXNoIChbbVsxXSB8fCAnJywgbVsyXV0pIH1cbiAgICAgICAgcGFydGl0aW9uLmxhc3RJbmRleCA9IDAgLy8gcmVzZXRcbiAgICAgICAgcmV0dXJuIHNwYW5zXG4gICAgfSxcblxuICAgIGZpcnN0IChzLCBuKSB7XG5cbiAgICAgICAgbGV0IHJlc3VsdCA9ICcnLCBsZW5ndGggPSAwXG5cbiAgICAgICAgZm9yIChjb25zdCBbbm9uUHJpbnRhYmxlLCBwcmludGFibGVdIG9mIG1vZHVsZS5leHBvcnRzLnBhcnRpdGlvbiAocykpIHtcbiAgICAgICAgICAgIGNvbnN0IHRleHQgPSBwcmludGFibGUuc3Vic3RyICgwLCBuIC0gbGVuZ3RoKVxuICAgICAgICAgICAgcmVzdWx0ICs9IG5vblByaW50YWJsZSArIHRleHRcbiAgICAgICAgICAgIGxlbmd0aCArPSB0ZXh0Lmxlbmd0aFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH1cbn0iXX0=