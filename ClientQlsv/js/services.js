var app = angular.module('ClientQlsv', []);

app.controller('getAll', function ($scope, $http, $window) {

    $http.get("http://serverqlsvapi.apphb.com/api/sinhvien/all").then(function successCallback(response) {
        $scope.sinhViens = response.data;
        $scope.code1 = response.status;

    }, function errorCallback(response) {
        $scope.code1 = response.status;
    });
});

app.controller('addSinhVien', function ($scope, $http, $window) {
    $scope.sendPost = function () {
        $http({
            url: "http://serverqlsvapi.apphb.com/api/sinhvien/add",
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: {
                MaSoSinhVien: $scope.mssv,
                HoTen: $scope.hoTen,
                NgaySinh: $scope.ngay + "/" + $scope.thang + "/" + $scope.nam,
                SoDienThoai: $scope.soDienThoai,
                DiemTichLuy: $scope.diemTichLuy
            }
        });

        $window.location.reload();

        /*var data = $.param({
            json: JSON.stringify({
                MaSoSinhVien: $scope.mssv,
                HoTen: $scope.hoTen,
                NgaySinh: $scope.ngaySinh,
                SoDienThoai: $scope.soDienThoai,
                DiemTichLuy: $scope.diemTichLuy
            })
        });*/
    }
});

app.controller('deleteSinhVien', function ($scope, $http, $window) {

    $scope.sendDelete = function () {
        var e = document.getElementById("sel");
        var i = e.options[e.selectedIndex].value;
        $http.delete("http://serverqlsvapi.apphb.com/api/sinhvien/delete?mssv=" + i);

        $window.location.reload();
    }
});

app.controller('getSinhVien', function ($scope, $http) {

    $scope.sendGet = function () {
        var e2 = document.getElementById("sel");
        var i2 = e2.options[e2.selectedIndex].value;

        $http.get("http://serverqlsvapi.apphb.com/api/sinhvien/get?mssv=" + i2).then(function successCallback(response) {

            var str = response.data.NgaySinh;
            var res = str.split("/");

            $scope.hoTen2 = response.data.HoTen;
            $scope.ngay2 = parseInt(res[0]);
            $scope.thang2 = parseInt(res[1]);
            $scope.nam2 = parseInt(res[2]);
            $scope.soDienThoai2 = response.data.SoDienThoai;
            $scope.diemTichLuy2 = response.data.DiemTichLuy;
        }, function errorCallback(response) {
        });
    }

});

app.controller('updateSinhVien', function ($scope, $http, $window) {

    $scope.sendPut = function () {

        var e3 = document.getElementById("sel");
        var i3 = e3.options[e3.selectedIndex].value;

        $http({
            url: "http://serverqlsvapi.apphb.com/api/sinhvien/update?mssv=" + i3,
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            data: {
                MaSoSinhVien: i3,
                HoTen: $scope.hoTen2,
                NgaySinh: $scope.ngay2 + "/" + $scope.thang2 + "/" + $scope.nam2,
                SoDienThoai: $scope.soDienThoai2,
                DiemTichLuy: $scope.diemTichLuy2
            }
        });

        $window.location.reload();
    }
});