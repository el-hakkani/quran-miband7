require('dotenv').config();

module.exports = function (grunt) {
    const p = [0, 3, 241, 376, 523, 631, 746, 876, 926, 1031, 1098, 1169, 1236, 1267, 1301, 1328, 1401, 1459, 1516, 1552, 1601, 1651, 1701, 1741, 1789, 1826, 1876, 1918, 1973, 2014, 2046, 2066,
        2081, 2131, 2163, 2192, 2221, 2256, 2282, 2327, 2376, 2406, 2438, 2471, 2487, 2503, 2527, 2546, 2568, 2581, 2595, 2608, 2621, 2634, 2647, 2663, 2679, 2701, 2718, 2736,
        2748, 2756, 2763, 2771, 2781, 2791, 2801, 2813, 2824, 2834, 2842, 2851, 2861, 2868, 2878, 2884, 2893, 2901, 2908, 2916, 2921, 2926, 2929, 2936, 2941, 2946, 2948, 2952,
        2956, 2962, 2966, 2969, 2972, 2974, 2976, 2978, 2981, 2983, 2987, 2989, 2991, 2994, 2996, 2997, 2999, 3001, 3003, 3005, 3006, 3008, 3009, 3011, 3012, 3014];

    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks("grunt-then");

    grunt.initConfig({
        exec: {
            zmake: {
                command: `${process.env.zmake} ./app/`,
                stdout: true,
                stderr: true
            },
            push: {
                command: `${process.env.adb} push ./app/dist/app.bin /storage/self/primary/APPS`,
                stdout: true,
                stderr: true
            },
        }
    });

    grunt.registerTask('build', 'Build the APP', function (start = 1, end = 114) {
        grunt.log.write('Generating The Holly Quran Watch 7 App ').ok();
        grunt.file.delete('app/assets/pages');
        grunt.file.delete('app/assets/surah');

        grunt.file.mkdir('app/assets/pages');
        grunt.file.mkdir('app/assets/surah');

        let pPaths = []

        grunt.file.recurse('assets/pages/', (abspath, rootdir, subdir, filename) => {
            pPaths.push(abspath);
        })

        pPaths.sort((a, b) => {
            const aNum = parseFloat(a.match(/(\d+(\.\d+)?)/)[1]);
            const bNum = parseFloat(b.match(/(\d+(\.\d+)?)/)[1]);
            return aNum - bNum;
        });

        if ((start.toString().includes(',') || !isNaN(start) && !isNaN(end))
            && process.env.with_amanar_rasulu == 1) {
            grunt.file.copy(pPaths[238], 'app/' + pPaths[238]);
            grunt.file.copy(pPaths[239], 'app/' + pPaths[239]);
            grunt.file.copy(pPaths[240], 'app/' + pPaths[240]);
        }

        if (start.toString().includes(',')) {
            let requestedPages = start.toString().split(',').map(s => parseInt(s));
            requestedPages.forEach(page => {
                grunt.file.copy(`assets/surah/${page}.png`, `app/assets/surah/${page}.png`);

                for (let i = p[page - 1]; i < (page == 114 ? 3016 : p[page]); i++) {
                    grunt.file.copy(pPaths[i], 'app/' + pPaths[i]);
                }
            });

            grunt.file.write('app/page/pages.js', `export const requested_surah_starting_indexes = [${requestedPages.map(i => p[i - 1])}];`);
            grunt.file.write('app/page/version.js', `export const version = "v${(new Date()).toLocaleDateString('en-CA')}";`);
            grunt.task.run('exec:zmake');

            if (process.env.push == 1)
                grunt.task.run('exec:push');
        } else if (!isNaN(start) && !isNaN(end)) {
            start = parseInt(start);
            end = parseInt(end);

            for (let i = start; i <= end; i++) {
                grunt.file.copy(`assets/surah/${i}.png`, `app/assets/surah/${i}.png`);

                for (let j = p[i - 1]; j < (i == 114 ? 3016 : p[i]); j++) {
                    grunt.file.copy(pPaths[j], 'app/' + pPaths[j]);
                }
            }

            grunt.file.write('app/page/pages.js', `export const requested_surah_starting_indexes = [${p.slice(start - 1, end)}];`);
            grunt.file.write('app/page/version.js', `export const version = "v${(new Date()).toLocaleDateString('en-CA')}";`);
            grunt.task.run('exec:zmake');
            if (process.env.push == 1)
                grunt.task.run('exec:push');
        } else {
            grunt.log.write('Invalid Input Type').error();
        }
    });

    grunt.registerTask('build-all-surah', 'Build the APP for all surahs', function () {
        const surah = [
            'surah-al-fatihah',
            'surah-al-baqarah',
            'surah-aali-imran',
            'surah-an-nisa',
            'surah-al-ma-idah',
            'surah-al-an-am',
            'surah-al-a-raf',
            'surah-al-anfal',
            'surah-at-taubah',
            'surah-yunus',
            'surah-hud',
            'surah-yusuf',
            'surah-ar-ra-d',
            'surah-ibrahim',
            'surah-al-hijr',
            'surah-an-nahl',
            'surah-al-isra',
            'surah-al-kahf',
            'surah-maryam',
            'surah-ta-ha',
            'surah-al-anbiya',
            'surah-al-haj',
            'surah-al-mu-minun',
            'surah-an-nur',
            'surah-al-furqan',
            'surah-ash-shu-ara',
            'surah-an-naml',
            'surah-al-qasas',
            'surah-al-ankabut',
            'surah-ar-rum',
            'surah-luqman',
            'surah-as-sajdah',
            'surah-al-ahzab',
            'surah-saba',
            'surah-al-fatir',
            'surah-ya-sin',
            'surah-as-saffah',
            'surah-sad',
            'surah-az-zumar',
            'surah-ghafar',
            'surah-fusilat',
            'surah-ash-shura',
            'surah-az-zukhruf',
            'surah-ad-dukhan',
            'surah-al-jathiyah',
            'surah-al-ahqaf',
            'surah-muhammad',
            'surah-al-fat-h',
            'surah-al-hujurat',
            'surah-qaf',
            'surah-adz-dzariyah',
            'surah-at-tur',
            'surah-an-najm',
            'surah-al-qamar',
            'surah-ar-rahman',
            'surah-al-waqi-ah',
            'surah-al-hadid',
            'surah-al-mujadilah',
            'surah-al-hashr',
            'surah-al-mumtahanah',
            'surah-as-saf',
            'surah-al-jum-ah',
            'surah-al-munafiqun',
            'surah-at-taghabun',
            'surah-at-talaq',
            'surah-at-tahrim',
            'surah-al-mulk',
            'surah-al-qalam',
            'surah-al-haqqah',
            'surah-al-ma-arij',
            'surah-nuh',
            'surah-al-jinn',
            'surah-al-muzammil',
            'surah-al-mudaththir',
            'surah-al-qiyamah',
            'surah-al-insan',
            'surah-al-mursalat',
            'surah-an-naba',
            'surah-an-nazi-at',
            'surah-abasa',
            'surah-at-takwir',
            'surah-al-infitar',
            'surah-al-mutaffifin',
            'surah-al-inshiqaq',
            'surah-al-buruj',
            'surah-at-tariq',
            'surah-al-a-la',
            'surah-al-ghashiyah',
            'surah-al-fajr',
            'surah-al-balad',
            'surah-ash-shams',
            'surah-al-layl',
            'surah-adh-dhuha',
            'surah-al-inshirah',
            'surah-at-tin',
            'surah-al-alaq',
            'surah-al-qadar',
            'surah-al-bayinah',
            'surah-az-zalzalah',
            'surah-al-adiyah',
            'surah-al-qari-ah',
            'surah-at-takathur',
            'surah-al-asr',
            'surah-al-humazah',
            'surah-al-fil',
            'surah-quraish',
            'surah-al-ma-un',
            'surah-al-kauthar',
            'surah-al-kafirun',
            'surah-an-nasr',
            'surah-al-masad',
            'surah-al-ikhlas',
            'surah-al-falaq',
            'surah-an-nas'
        ];

        process.env.push = 0;
        for (let index = 1; index <= 114; index++) {
            grunt.task.run(`build:${index}:${index}`).then(function () {
                grunt.log.write(`Generating The Holly Quran Watch 7 App with ${surah[index - 1]}`).ok();
                grunt.file.copy('app/dist/app.bin', `compile/surah/${index}-${surah[index - 1]}.bin`);
            });
        }
    });
};
