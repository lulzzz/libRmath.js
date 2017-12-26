process.env.DEBUG = 'bessel_j, bessel_j_ex,J_bessel';
const libR = require('./dist/lib/libR');
let sd = new libR.rng.SuperDuper(0);
srt = libR.SignRank();
psignrank = srt.psignrank;
seq = libR.R.seq()();
student = libR.StudentT();
let w = libR.Wilcoxon(sd);
let bJ = libR.special.besselJ;